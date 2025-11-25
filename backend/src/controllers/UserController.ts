import { Response } from 'express';
import { ValidateRequest } from '../middleware/validation';
import { userService } from '../services/UserService';
import { AppErrorHandler } from '../middleware/errorHandler';

export class UserController {
  /**
   * GET /api/v1/users - Listar todos os usuários
   */
  async getAllUsers(req: ValidateRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as 'active' | 'inactive' | undefined;

    const result = await userService.getAllUsers(page, limit, status);

    res.json({
      success: true,
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    });
  }

  /**
   * GET /api/v1/users/active - Listar usuários ativos
   */
  async getActiveUsers(req: ValidateRequest, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await userService.getActiveUsers(page, limit);

    res.json({
      success: true,
      data: result.data,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages,
      },
    });
  }

  /**
   * GET /api/v1/users/:id - Buscar usuário por ID
   */
  async getUserById(req: ValidateRequest, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    res.json({
      success: true,
      data: user,
    });
  }

  /**
   * GET /api/v1/users/search/by-email - Buscar usuário por email
   */
  async getUserByEmail(req: ValidateRequest, res: Response): Promise<void> {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      throw new AppErrorHandler('Email query parameter is required', 400);
    }

    const user = await userService.getUserByEmail(email);

    res.json({
      success: true,
      data: user,
    });
  }

  /**
   * GET /api/v1/users/age-range - Buscar usuários por faixa de idade
   */
  async getUsersByAgeRange(req: ValidateRequest, res: Response): Promise<void> {
    const { minAge, maxAge } = req.query;

    if (!minAge || !maxAge) {
      throw new AppErrorHandler('minAge and maxAge query parameters are required', 400);
    }

    const min = parseInt(minAge as string);
    const max = parseInt(maxAge as string);

    if (isNaN(min) || isNaN(max)) {
      throw new AppErrorHandler('minAge and maxAge must be valid numbers', 400);
    }

    const users = await userService.getUsersByAgeRange(min, max);

    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  }

  /**
   * POST /api/v1/users - Criar novo usuário
   */
  async createUser(req: ValidateRequest, res: Response): Promise<void> {
    const user = await userService.createUser(req.validatedData as Record<string, unknown>);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  }

  /**
   * PUT /api/v1/users/:id - Atualizar usuário
   */
  async updateUser(req: ValidateRequest, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userService.updateUser(id, req.validatedData as Record<string, unknown>);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  }

  /**
   * DELETE /api/v1/users/:id - Deletar usuário
   */
  async deleteUser(req: ValidateRequest, res: Response): Promise<void> {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  }

  /**
   * PATCH /api/v1/users/:id/deactivate - Desativar usuário
   */
  async deactivateUser(req: ValidateRequest, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userService.deactivateUser(id);

    res.json({
      success: true,
      message: 'User deactivated successfully',
      data: user,
    });
  }

  /**
   * PATCH /api/v1/users/:id/reactivate - Reativar usuário
   */
  async reactivateUser(req: ValidateRequest, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await userService.reactivateUser(id);

    res.json({
      success: true,
      message: 'User reactivated successfully',
      data: user,
    });
  }

  /**
   * GET /api/v1/users/stats/count - Contar usuários
   */
  async countUsers(req: ValidateRequest, res: Response): Promise<void> {
    const status = req.query.status as 'active' | 'inactive' | undefined;

    const count = await userService.countUsers(status);

    res.json({
      success: true,
      count,
      status: status || 'all',
    });
  }
}

export const userController = new UserController();
