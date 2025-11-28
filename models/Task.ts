import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    area: string;
    assignedTo: string;
    assignedToId?: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    duration: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    description?: string;
    recurring?: {
        enabled: boolean;
        frequency: 'daily' | 'weekly' | 'monthly';
        daysOfWeek?: number[]; // 0-6 (Sunday-Saturday)
        endDate?: Date;
    };
    checklist?: Array<{
        item: string;
        completed: boolean;
    }>;
    notes?: string;
    completedAt?: Date;
    completedBy?: string;
    userId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
        },
        area: {
            type: String,
            required: [true, 'Area is required'],
            trim: true,
        },
        assignedTo: {
            type: String,
            required: [true, 'Assigned team member is required'],
            trim: true,
        },
        assignedToId: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        time: {
            type: String,
            required: [true, 'Time is required'],
            trim: true,
        },
        duration: {
            type: String,
            default: '30 mins',
            trim: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium',
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'cancelled'],
            default: 'pending',
        },
        description: {
            type: String,
            trim: true,
        },
        recurring: {
            enabled: {
                type: Boolean,
                default: false,
            },
            frequency: {
                type: String,
                enum: ['daily', 'weekly', 'monthly'],
            },
            daysOfWeek: {
                type: [Number],
                validate: {
                    validator: function (arr: number[]) {
                        return arr.every(day => day >= 0 && day <= 6);
                    },
                    message: 'Days of week must be between 0-6 (Sunday-Saturday)',
                },
            },
            endDate: {
                type: Date,
            },
        },
        checklist: [
            {
                item: {
                    type: String,
                    required: true,
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        notes: {
            type: String,
            trim: true,
        },
        completedAt: {
            type: Date,
        },
        completedBy: {
            type: String,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for faster queries
TaskSchema.index({ date: 1, status: 1 });
TaskSchema.index({ assignedToId: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ userId: 1 });

// Auto-set completedAt when status changes to completed
TaskSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
        this.completedAt = new Date();
    }
    next();
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
