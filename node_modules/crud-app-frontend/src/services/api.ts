import axios, { AxiosInstance, AxiosError } from 'axios';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  age: number;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:3000/api/v1') {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response: any) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET /users - Listar todos os usuários
   */
  async getAllUsers(page: number = 1, limit: number = 10, status?: 'active' | 'inactive') {
    try {
      const response = await this.api.get<PaginatedResponse<IUser>>('/users', {
        params: { page, limit, ...(status && { status }) },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET /users/active - Listar usuários ativos
   */
  async getActiveUsers(page: number = 1, limit: number = 10) {
    try {
      const response = await this.api.get<PaginatedResponse<IUser>>('/users/active', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET /users/:id - Buscar usuário por ID
   */
  async getUserById(id: string) {
    try {
      const response = await this.api.get<ApiResponse<IUser>>(`/users/${id}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET /users/search/by-email - Buscar por email
   */
  async getUserByEmail(email: string) {
    try {
      const response = await this.api.get<ApiResponse<IUser>>('/users/search/by-email', {
        params: { email },
      });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET /users/age-range - Buscar por faixa de idade
   */
  async getUsersByAgeRange(minAge: number, maxAge: number) {
    try {
      const response = await this.api.get<ApiResponse<IUser[]>>('/users/age-range', {
        params: { minAge, maxAge },
      });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET /users/stats/count - Contar usuários
   */
  async countUsers(status?: 'active' | 'inactive') {
    try {
      const response = await this.api.get<{ success: boolean; count: number }>('/users/stats/count', {
        params: { ...(status && { status }) },
      });
      return response.data.count;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST /users - Criar novo usuário
   */
  async createUser(userData: Partial<IUser>) {
    try {
      const response = await this.api.post<ApiResponse<IUser>>('/users', userData);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT /users/:id - Atualizar usuário
   */
  async updateUser(id: string, userData: Partial<IUser>) {
    try {
      const response = await this.api.put<ApiResponse<IUser>>(`/users/${id}`, userData);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE /users/:id - Deletar usuário
   */
  async deleteUser(id: string) {
    try {
      const response = await this.api.delete<ApiResponse<null>>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH /users/:id/deactivate - Desativar usuário
   */
  async deactivateUser(id: string) {
    try {
      const response = await this.api.patch<ApiResponse<IUser>>(`/users/${id}/deactivate`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH /users/:id/reactivate - Reativar usuário
   */
  async reactivateUser(id: string) {
    try {
      const response = await this.api.patch<ApiResponse<IUser>>(`/users/${id}/reactivate`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Tratamento centralizado de erros
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const responseData = (error as any).response?.data as any;
      const message = responseData?.error || (error as any).message || 'An error occurred';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }

  /**
   * Atualizar base URL
   */
  setBaseURL(baseURL: string) {
    this.baseURL = baseURL;
    this.api.defaults.baseURL = baseURL;
  }
}

export const apiService = new ApiService();
