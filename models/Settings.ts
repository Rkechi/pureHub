import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    userId: mongoose.Types.ObjectId;

    // Notification preferences
    notifications: {
        email: boolean;
        push: boolean;
        taskReminders: boolean;
        teamUpdates: boolean;
        reportAlerts: boolean;
    };

    // Dashboard preferences
    dashboard: {
        defaultView: 'overview' | 'tasks' | 'team' | 'reports';
        theme: 'light' | 'dark' | 'auto';
        language: string;
        timezone: string;
    };

    // Task preferences
    tasks: {
        defaultDuration: string;
        defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
        autoAssign: boolean;
        reminderMinutes: number;
    };

    // Report preferences
    reports: {
        defaultPeriod: 'week' | 'month' | 'quarter' | 'year';
        emailReports: boolean;
        reportFrequency: 'daily' | 'weekly' | 'monthly';
    };

    // Privacy settings
    privacy: {
        profileVisible: boolean;
        activityTracking: boolean;
        dataSharing: boolean;
    };

    createdAt: Date;
    updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
            index: true,
        },

        notifications: {
            email: {
                type: Boolean,
                default: true,
            },
            push: {
                type: Boolean,
                default: true,
            },
            taskReminders: {
                type: Boolean,
                default: true,
            },
            teamUpdates: {
                type: Boolean,
                default: true,
            },
            reportAlerts: {
                type: Boolean,
                default: false,
            },
        },

        dashboard: {
            defaultView: {
                type: String,
                enum: ['overview', 'tasks', 'team', 'reports'],
                default: 'overview',
            },
            theme: {
                type: String,
                enum: ['light', 'dark', 'auto'],
                default: 'light',
            },
            language: {
                type: String,
                default: 'en',
            },
            timezone: {
                type: String,
                default: 'UTC',
            },
        },

        tasks: {
            defaultDuration: {
                type: String,
                default: '30 mins',
            },
            defaultPriority: {
                type: String,
                enum: ['low', 'medium', 'high', 'urgent'],
                default: 'medium',
            },
            autoAssign: {
                type: Boolean,
                default: false,
            },
            reminderMinutes: {
                type: Number,
                default: 30,
                min: 0,
            },
        },

        reports: {
            defaultPeriod: {
                type: String,
                enum: ['week', 'month', 'quarter', 'year'],
                default: 'month',
            },
            emailReports: {
                type: Boolean,
                default: false,
            },
            reportFrequency: {
                type: String,
                enum: ['daily', 'weekly', 'monthly'],
                default: 'weekly',
            },
        },

        privacy: {
            profileVisible: {
                type: Boolean,
                default: true,
            },
            activityTracking: {
                type: Boolean,
                default: true,
            },
            dataSharing: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);



export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
