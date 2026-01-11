// API utility functions for frontend

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    total?: number;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_URL) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    // Pages API
    async getPages(params?: { status?: string; search?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.request(`/pages${query ? `?${query}` : ''}`);
    }

    async getPage(id: string) {
        return this.request(`/pages/${id}`);
    }

    async createPage(data: any) {
        return this.request('/pages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updatePage(id: string, data: any) {
        return this.request(`/pages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deletePage(id: string) {
        return this.request(`/pages/${id}`, {
            method: 'DELETE',
        });
    }

    // Collections API
    async getCollections(params?: { status?: string; search?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.request(`/collections${query ? `?${query}` : ''}`);
    }

    async createCollection(data: any) {
        return this.request('/collections', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Products API
    async getProducts(params?: {
        status?: string;
        collection?: string;
        search?: string;
    }) {
        const query = new URLSearchParams(params as any).toString();
        return this.request(`/products${query ? `?${query}` : ''}`);
    }

    async createProduct(data: any) {
        return this.request('/products', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Media API
    async getMedia(params?: { search?: string; type?: string }) {
        const query = new URLSearchParams(params as any).toString();
        return this.request(`/media${query ? `?${query}` : ''}`);
    }

    async uploadMedia(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${this.baseUrl}/media`, {
                method: 'POST',
                body: formData,
            });

            return await response.json();
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed',
            };
        }
    }

    async deleteMedia(id: string) {
        return this.request(`/media?id=${id}`, {
            method: 'DELETE',
        });
    }

    // Settings API
    async getSettings() {
        return this.request('/settings');
    }

    async updateSettings(data: any) {
        return this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
}

export const api = new ApiClient();
export default api;
