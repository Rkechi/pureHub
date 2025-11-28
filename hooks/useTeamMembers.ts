import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
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
}

interface NewMember {
    name: string;
    email: string;
    phone: string;
    role: string;
    specialization: string;
}

export function useTeamMembers() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await api.get<TeamMember[]>('/api/team/members');

            if (response.success && response.data) {
                setMembers(response.data);
                setError(null);
            } else {
                setError(response.message || 'Failed to fetch team members');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch team members');
        } finally {
            setLoading(false);
        }
    };

    const addMember = async (memberData: NewMember) => {
        try {
            const response = await api.post<TeamMember>('/api/team/members', memberData);

            if (response.success && response.data) {
                setMembers(prev => [...prev, response.data!]);
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to add member' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to add member' };
        }
    };

    const updateMember = async (id: string, updateData: Partial<TeamMember>) => {
        try {
            const response = await api.put<TeamMember>(`/api/team/members/${id}`, updateData);

            if (response.success && response.data) {
                setMembers(prev => prev.map(m => m._id === id ? response.data! : m));
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to update member' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to update member' };
        }
    };

    const deleteMember = async (id: string) => {
        try {
            const response = await api.delete(`/api/team/members/${id}`);

            if (response.success) {
                setMembers(prev => prev.filter(m => m._id !== id));
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to delete member' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to delete member' };
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return {
        members,
        loading,
        error,
        addMember,
        updateMember,
        deleteMember,
        refresh: fetchMembers,
    };
}
