import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string,
    password: string,
    role: 'admin' | 'manager' | 'cleaner';
    company?: string;
    phone?: string;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name must be at most 100 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'cleaner'],
        default: 'manager',
    },
    company: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true,
    }
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, isActive: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
