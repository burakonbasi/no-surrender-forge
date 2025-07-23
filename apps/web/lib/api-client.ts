import type { 
    ProgressBatchInput, 
    LevelUpInput, 
    Card, 
    UserCard 
  } from '@no-surrender/common';
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  class ApiClient {
    private token: string | null = null;
  
    setToken(token: string) {
      this.token = token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
      }
    }
  
    getToken(): string | null {
      if (typeof window !== 'undefined' && !this.token) {
        this.token = localStorage.getItem('auth_token');
      }
      return this.token;
    }
  
    clearToken() {
      this.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
  
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
      const token = this.getToken();
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options?.headers,
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        throw new Error(`API Error: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    async login(username: string, password: string) {
      const data = await this.request<{ token: string; userId: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      this.setToken(data.token);
      return data;
    }
  
    async register(username: string, password: string) {
      const data = await this.request<{ token: string; userId: string }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      this.setToken(data.token);
      return data;
    }
  
    async progressBatch(input: ProgressBatchInput) {
      return this.request<{ cardId: string; progress: number; level: number }>('/api/progress-batch', {
        method: 'POST',
        body: JSON.stringify(input),
      });
    }
  
    async levelUp(input: LevelUpInput) {
      return this.request<{ cardId: string; level: number; progress: number }>('/api/level-up', {
        method: 'POST',
        body: JSON.stringify(input),
      });
    }
  
    async getEnergy() {
      return this.request<{ energy: number; maxEnergy: number; regenMinutes: number }>('/api/energy');
    }
  
    async getCards() {
      return this.request<{ cards: (Card & { userLevel: number; userProgress: number })[] }>('/api/cards');
    }
  }
  
  export const apiClient = new ApiClient();