import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-app-router';
import { blockchainAudit, type BlockData } from '@/lib/blockchain/auditTrail';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

// Blockchain Audit Trail Model
const AuditTrailSchema = new mongoose.Schema({
    taskId: { type: String, required: true, unique: true, index: true },
    blocks: [{
        index: Number,
        timestamp: Date,
        data: mongoose.Schema.Types.Mixed,
        previousHash: String,
        hash: String,
        nonce: Number,
    }],
    verified: Boolean,
    createdAt: Date,
    lastModified: Date,
}, { timestamps: true });

const AuditTrail = mongoose.models.AuditTrail || mongoose.model('AuditTrail', AuditTrailSchema);

/**
 * Blockchain Audit Trail API
 * Creates immutable, tamper-proof records of task actions
 */

export async function POST(request: NextRequest) {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    try {
        await connectDB();

        const body = await request.json();
        const { taskId, action, data, metadata } = body;

        if (!taskId || !action) {
            return NextResponse.json(
                { error: 'taskId and action required' },
                { status: 400 }
            );
        }

        const blockData: BlockData = {
            taskId,
            action,
            performedBy: authResult.user.id,
            timestamp: new Date(),
            data: data || {},
            metadata: metadata || {},
        };

        // Check if audit trail exists
        let trail = await AuditTrail.findOne({ taskId });

        if (!trail) {
            // Create new audit trail
            const newTrail = blockchainAudit.createAuditTrail(taskId, blockData);
            trail = await AuditTrail.create(newTrail);
        } else {
            // Add block to existing trail
            const updatedTrail = blockchainAudit.addBlock(trail, blockData);
            await AuditTrail.updateOne(
                { taskId },
                {
                    $set: {
                        blocks: updatedTrail.blocks,
                        verified: updatedTrail.verified,
                        lastModified: updatedTrail.lastModified,
                    },
                }
            );
            trail = updatedTrail;
        }

        // Verify integrity
        const verification = blockchainAudit.verifyAuditTrail(trail);

        return NextResponse.json({
            success: true,
            message: 'Block added to audit trail',
            block: trail.blocks[trail.blocks.length - 1],
            auditTrail: {
                taskId: trail.taskId,
                totalBlocks: trail.blocks.length,
                verified: verification.valid,
                lastHash: trail.blocks[trail.blocks.length - 1].hash,
            },
        });
    } catch (error: any) {
        console.error('Blockchain audit error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create audit block',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// GET endpoint - retrieve audit trail
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

        // Verify integrity
        const verification = blockchainAudit.verifyAuditTrail(trail);
        const summary = blockchainAudit.summarizeTrail(trail);
        const proof = blockchainAudit.generateCompletionProof(trail);

        return NextResponse.json({
            success: true,
            auditTrail: trail,
            verification,
            summary,
            proof,
            immutable: verification.valid,
        });
    } catch (error: any) {
        console.error('Audit retrieval error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// DELETE endpoint - not allowed for immutability
export async function DELETE(request: NextRequest) {
    return NextResponse.json(
        {
            error: 'Deletion not allowed',
            message: 'Audit trails are immutable and cannot be deleted',
        },
        { status: 403 }
    );
}
