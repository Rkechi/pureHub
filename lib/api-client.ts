/**
 * API Client with automatic authentication
 * Automatically adds JWT token to all requests
 */

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = '') {
        this.baseURL = baseURL;
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('token');
    }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
        const data = await response.json();

        // Handle 401 Unauthorized - redirect to login
        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        return data;
    }

    async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        return this.handleResponse<T>(response);
    }

    async post<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    async put<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    async patch<T = any>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        return this.handleResponse<T>(response);
    }
}

// Export singleton instance
export const api = new ApiClient();

// Export type for use in components
export type { ApiResponse };
