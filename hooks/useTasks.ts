import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface Task {
    _id: string;
    title: string;
    area: string;
    assignedTo: string;
    date: Date;
    time: string;
    duration: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    description?: string;
}

interface NewTask {
    title: string;
    area: string;
    assignedTo: string;
    date: string;
    time: string;
    priority: string;
    description?: string;
}

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async (filters?: { status?: string; startDate?: string; endDate?: string }) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(filters as any).toString();
            const endpoint = `/api/schedule/tasks${queryParams ? `?${queryParams}` : ''}`;

            const response = await api.get<Task[]>(endpoint);

            if (response.success && response.data) {
                setTasks(response.data);
                setError(null);
            } else {
                setError(response.message || 'Failed to fetch tasks');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData: NewTask) => {
        try {
            const response = await api.post<Task>('/api/schedule/tasks', taskData);

            if (response.success && response.data) {
                setTasks(prev => [...prev, response.data!]);
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to add task' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to add task' };
        }
    };

    const updateTaskStatus = async (id: string, status: string) => {
        try {
            const response = await api.patch<Task>(`/api/schedule/tasks/${id}`, { status });

            if (response.success && response.data) {
                setTasks(prev => prev.map(t => t._id === id ? response.data! : t));
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to update task' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to update task' };
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const response = await api.delete(`/api/schedule/tasks/${id}`);

            if (response.success) {
                setTasks(prev => prev.filter(t => t._id !== id));
                return { success: true };
            } else {
                return { success: false, error: response.message || 'Failed to delete task' };
            }
        } catch (err: any) {
            return { success: false, error: err.message || 'Failed to delete task' };
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        addTask,
        updateTaskStatus,
        deleteTask,
        refresh: fetchTasks,
    };
}
