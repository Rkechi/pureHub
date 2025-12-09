import CryptoJS from 'crypto-js';

/**
 * Blockchain-inspired immutable audit trail system
 * Provides cryptographic verification without requiring full blockchain infrastructure
 */

export interface BlockData {
    taskId: string;
    action: 'created' | 'started' | 'completed' | 'verified' | 'rejected';
    performedBy: string;
    timestamp: Date;
    data: Record<string, any>;
    metadata?: {
        location?: { lat: number; lng: number };
        deviceId?: string;
        ipAddress?: string;
    };
}

export interface Block {
    index: number;
    timestamp: Date;
    data: BlockData;
    previousHash: string;
    hash: string;
    nonce: number;
}

export interface AuditTrail {
    taskId: string;
    blocks: Block[];
    verified: boolean;
    createdAt: Date;
    lastModified: Date;
}

export class BlockchainAuditTrail {
    /**
     * Create immutable record of a task action
     */
    createBlock(data: BlockData, previousHash: string = '0'): Block {
        const timestamp = new Date();
        const block: Omit<Block, 'hash' | 'nonce'> = {
            index: 0,
            timestamp,
            data,
            previousHash,
        };

        const { hash, nonce } = this.mineBlock(block);

        return {
            ...block,
            hash,
            nonce,
        };
    }

    /**
     * Mine a block (proof of work - simplified for demonstration)
     */
    private mineBlock(block: Omit<Block, 'hash' | 'nonce'>, difficulty: number = 2): {
        hash: string;
        nonce: number;
    } {
        let nonce = 0;
        let hash = '';
        const target = '0'.repeat(difficulty);

        while (true) {
            hash = this.calculateHash({ ...block, nonce });
            if (hash.substring(0, difficulty) === target) {
                break;
            }
            nonce++;
        }

        return { hash, nonce };
    }

    /**
     * Calculate cryptographic hash of a block
     */
    calculateHash(block: Omit<Block, 'hash'>): string {
        const blockString = JSON.stringify({
            index: block.index,
            timestamp: block.timestamp,
            data: block.data,
            previousHash: block.previousHash,
            nonce: block.nonce,
        });

        return CryptoJS.SHA256(blockString).toString();
    }

    /**
     * Verify the integrity of an audit trail
     */
    verifyAuditTrail(trail: AuditTrail): {
        valid: boolean;
        errors: string[];
    } {
        const errors: string[] = [];

        if (trail.blocks.length === 0) {
            return { valid: false, errors: ['Audit trail is empty'] };
        }

        // Verify each block
        for (let i = 0; i < trail.blocks.length; i++) {
            const block = trail.blocks[i];

            // Check hash integrity
            const calculatedHash = this.calculateHash({
                index: block.index,
                timestamp: block.timestamp,
                data: block.data,
                previousHash: block.previousHash,
                nonce: block.nonce,
            });

            if (calculatedHash !== block.hash) {
                errors.push(`Block ${i}: Hash mismatch (tampered)`);
            }

            // Check chain integrity
            if (i > 0) {
                if (block.previousHash !== trail.blocks[i - 1].hash) {
                    errors.push(`Block ${i}: Previous hash mismatch (broken chain)`);
                }
            }

            // Check timestamp sequence
            if (i > 0) {
                if (block.timestamp < trail.blocks[i - 1].timestamp) {
                    errors.push(`Block ${i}: Timestamp out of sequence`);
                }
            }
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

    /**
     * Create a complete audit trail for a task
     */
    createAuditTrail(taskId: string, initialData: BlockData): AuditTrail {
        const genesisBlock = this.createBlock(initialData, '0');
        genesisBlock.index = 0;

        return {
            taskId,
            blocks: [genesisBlock],
            verified: true,
            createdAt: new Date(),
            lastModified: new Date(),
        };
    }

    /**
     * Add a new block to an existing audit trail
     */
    addBlock(trail: AuditTrail, data: BlockData): AuditTrail {
        const previousBlock = trail.blocks[trail.blocks.length - 1];
        const newBlock = this.createBlock(data, previousBlock.hash);
        newBlock.index = previousBlock.index + 1;

        const updatedTrail = {
            ...trail,
            blocks: [...trail.blocks, newBlock],
            lastModified: new Date(),
        };

        // Verify integrity after adding
        const verification = this.verifyAuditTrail(updatedTrail);
        updatedTrail.verified = verification.valid;

        return updatedTrail;
    }

    /**
     * Generate cryptographic proof of completion
     */
    generateCompletionProof(trail: AuditTrail): string {
        const lastBlock = trail.blocks[trail.blocks.length - 1];
        const proofData = {
            taskId: trail.taskId,
            blockCount: trail.blocks.length,
            finalHash: lastBlock.hash,
            timestamp: lastBlock.timestamp,
        };

        return CryptoJS.SHA256(JSON.stringify(proofData)).toString();
    }

    /**
     * Verify a completion proof
     */
    verifyCompletionProof(trail: AuditTrail, proof: string): boolean {
        const calculated = this.generateCompletionProof(trail);
        return calculated === proof;
    }

    /**
     * Export audit trail as immutable certificate
     */
    exportCertificate(trail: AuditTrail): {
        certificate: string;
        qrCode: string;
        metadata: {
            taskId: string;
            blocks: number;
            verified: boolean;
            proof: string;
        };
    } {
        const verification = this.verifyAuditTrail(trail);
        const proof = this.generateCompletionProof(trail);

        const certificate = Buffer.from(JSON.stringify({
            trail,
            verification,
            proof,
            exportedAt: new Date(),
        })).toString('base64');

        // QR code data (for mobile verification)
        const qrCode = JSON.stringify({
            taskId: trail.taskId,
            proof,
            verify: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${proof}`,
        });

        return {
            certificate,
            qrCode,
            metadata: {
                taskId: trail.taskId,
                blocks: trail.blocks.length,
                verified: verification.valid,
                proof,
            },
        };
    }

    /**
     * Get human-readable summary of audit trail
     */
    summarizeTrail(trail: AuditTrail): {
        taskId: string;
        totalActions: number;
        timeline: { action: string; timestamp: Date; performedBy: string }[];
        isValid: boolean;
        duration: number; // in minutes
    } {
        const verification = this.verifyAuditTrail(trail);
        const timeline = trail.blocks.map(block => ({
            action: block.data.action,
            timestamp: block.data.timestamp,
            performedBy: block.data.performedBy,
        }));

        const firstBlock = trail.blocks[0];
        const lastBlock = trail.blocks[trail.blocks.length - 1];
        const duration = (lastBlock.timestamp.getTime() - firstBlock.timestamp.getTime()) / 60000;

        return {
            taskId: trail.taskId,
            totalActions: trail.blocks.length,
            timeline,
            isValid: verification.valid,
            duration,
        };
    }
}

// Singleton instance
export const blockchainAudit = new BlockchainAuditTrail();
