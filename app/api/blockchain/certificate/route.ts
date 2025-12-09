import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-app-router';
import { blockchainAudit } from '@/lib/blockchain/auditTrail';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

const AuditTrailSchema = new mongoose.Schema({
    taskId: { type: String, required: true, unique: true, index: true },
    blocks: Array,
    verified: Boolean,
    createdAt: Date,
    lastModified: Date,
});

const AuditTrail = mongoose.models.AuditTrail || mongoose.model('AuditTrail', AuditTrailSchema);

/**
 * Generate compliance certificate from audit trail
 * Provides tamper-proof verification for enterprise clients
 */

export async function GET(request: NextRequest) {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    try {
        await connectDB();

        const taskId = request.nextUrl.searchParams.get('taskId');

        if (!taskId) {
            return NextResponse.json(
                { error: 'taskId parameter required' },
                { status: 400 }
            );
        }

        const trail = await AuditTrail.findOne({ taskId });

        if (!trail) {
            return NextResponse.json(
                { error: 'Audit trail not found' },
                { status: 404 }
            );
        }

        // Verify integrity first
        const verification = blockchainAudit.verifyAuditTrail(trail);

        if (!verification.valid) {
            return NextResponse.json(
                {
                    error: 'Audit trail verification failed',
                    errors: verification.errors,
                },
                { status: 400 }
            );
        }

        // Generate certificate
        const certificate = blockchainAudit.exportCertificate(trail);

        return NextResponse.json({
            success: true,
            certificate: certificate.certificate,
            qrCode: certificate.qrCode,
            metadata: certificate.metadata,
            issuedAt: new Date(),
            issuedBy: 'PureHive Blockchain System',
            verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${certificate.metadata.proof}`,
        });
    } catch (error: any) {
        console.error('Certificate generation error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
