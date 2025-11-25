import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICleaningLog extends Document {
    area: string;
    cleaner: string;
    cleanerld?: mongoose.Types.ObjectId;
    timestamp: Date;
    vocLevel: number;
    waterUsed: number;
    chemicalUsed: number;
    tools: string[];
    conditions: {
        humidity: number;
        temperature: number;
    };
    status: 'scheduled' | 'in-progress' | 'completed' | 'verified' | 'cancelled';
    blockchainHash: string;
    notes?: string[];
    images?: string[];
    duration: number; // in minutes
    createdAt: Date;
    updatedAt: Date;
}

const CleaningLogSchema: Schema = new Schema(
    {
        area: {
            type: String,
            required: [true, 'Area is required'],
            trim: true,
        },
        cleaner: {
            type: String,
            required: [true, "Cleaner's name is required"],
        },
        cleanerId: {
            type: Schema.Types.ObjectId,
            ref:'User',
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        vocLevel: {
            type: Date,
            required: true,
            min: [0, 'VOC level seems too high'],
            max: [10, 'VOC level seems too high'],
        },
        waterUsed: {
            type: Number,
            required: true,
            min: [0, 'Water usage cannot be negative'],
        },
        chemicalUsed: {
            type: Number,
            default: 0,
            min: [0, 'Chemical usage cannot be negative'],
        },
        tools: {
            type: [String],
            default: [],
        },
        conditions: {
            humidity: {
                type: Number,
                min: 0,
                max: 100,
            },
            temperature: {
                type: Number,
                min: -50,
                max: 100,
            },
        },
        status: {
            type: String,
            enum: ['scheduled', 'in-progress', 'completed', 'verified', 'cancelled'],
            default: 'completed',
        },
        blockchainHash: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            maxlength: [1000, 'Notes cannot exceed 1000 characters'],
        },
        images: {
            type: [String],
            default: [],
        },
        duration: {
            type: Number,
            min: [0, 'Duration cannot be negative'],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for efficient queries
CleaningLogSchema.index({ timestamp: -1 });
CleaningLogSchema.index({ area: 1, timestamp: -1 });
CleaningLogSchema.index({ cleanerId: 1, timestamp: -1 });
CleaningLogSchema.index({ status: 1 });

const CleaningLog: Model<ICleaningLog> = mongoose.models.CleaningLog || mongoose.model<ICleaningLog>('CleaningLog', CleaningLogSchema);

export default CleaningLog;