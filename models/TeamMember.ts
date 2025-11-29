import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar?: string;
    rating: number;
    tasksCompleted: number;
    efficiency: number;
    specialization: string;
    status: 'active' | 'on-leave' | 'inactive';
    joinDate: Date;
    performance: {
        thisWeek: number;
        thisMonth: number;
        avgTime: string;
        quality: number;
    };
    userId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        avatar: {
            type: String,
            default: function () {
                // Generate initials from name
                const names = this.name.split(' ');
                return names.map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
            }
        },
        rating: {
            type: Number,
            default: 4.0,
            min: 0,
            max: 5,
        },
        tasksCompleted: {
            type: Number,
            default: 0,
            min: 0,
        },
        efficiency: {
            type: Number,
            default: 90,
            min: 0,
            max: 100,
        },
        specialization: {
            type: String,
            required: [true, 'Specialization is required'],
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'on-leave', 'inactive'],
            default: 'active',
        },
        joinDate: {
            type: Date,
            default: Date.now,
        },
        performance: {
            thisWeek: {
                type: Number,
                default: 0,
            },
            thisMonth: {
                type: Number,
                default: 0,
            },
            avgTime: {
                type: String,
                default: '30 mins',
            },
            quality: {
                type: Number,
                default: 95,
                min: 0,
                max: 100,
            },
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

// Index for faster queries
TeamMemberSchema.index({ status: 1 });
TeamMemberSchema.index({ userId: 1 });

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
