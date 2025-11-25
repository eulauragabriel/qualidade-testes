import { IUser, User } from '../models/User';
import { AppErrorHandler } from '../middleware/errorHandler';
import { config } from '../config/config';

export class UserService {
  /**
   * Criar um novo usuário
   */
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    try {
      // Validações básicas
      if (!userData.name || userData.name.trim().length === 0) {
        throw new AppErrorHandler('Name cannot be empty', 400);
      }

      if (!userData.email || userData.email.trim().length === 0) {
        throw new AppErrorHandler('Email is required', 400);
      }

      if (!userData.age || userData.age < config.minAge || userData.age > config.maxAge) {
        throw new AppErrorHandler(
          `Age must be between ${config.minAge} and ${config.maxAge}`,
          400
        );
      }

      // Verificar se email já existe
      const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
      if (existingUser) {
        throw new AppErrorHandler('Email already registered', 409);
      }

      const user = new User({
        name: userData.name.trim(),
        email: userData.email.toLowerCase(),
        age: userData.age,
        status: 'active',
      });

      await user.save();
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      throw new AppErrorHandler('Failed to create user', 500);
    }
  }

  /**
   * Buscar usuário por ID
   */
  async getUserById(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppErrorHandler('User not found', 404);
      }
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      if ((error as any).name === 'CastError') {
        throw new AppErrorHandler('Invalid user ID format', 400);
      }
      throw new AppErrorHandler('Failed to fetch user', 500);
    }
  }

  /**
   * Buscar usuário por email
   */
  async getUserByEmail(email: string): Promise<IUser> {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new AppErrorHandler('User not found', 404);
      }
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      throw new AppErrorHandler('Failed to fetch user', 500);
    }
  }

  /**
   * Listar todos os usuários com paginação e filtros
   */
  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    status?: 'active' | 'inactive'
  ): Promise<{ data: IUser[]; total: number; pages: number }> {
    try {
      const query = status ? { status } : {};
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        User.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        User.countDocuments(query),
      ]);

      return {
        data,
        total,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new AppErrorHandler('Failed to fetch users', 500);
    }
  }

  /**
   * Listar usuários ativos
   */
  async getActiveUsers(page: number = 1, limit: number = 10): Promise<{
    data: IUser[];
    total: number;
    pages: number;
  }> {
    return this.getAllUsers(page, limit, 'active');
  }

  /**
   * Buscar usuários por faixa de idade
   */
  async getUsersByAgeRange(
    minAge: number,
    maxAge: number
  ): Promise<IUser[]> {
    try {
      return await User.find({
        age: { $gte: minAge, $lte: maxAge },
        status: 'active',
      }).sort({ age: 1 });
    } catch (error) {
      throw new AppErrorHandler('Failed to fetch users', 500);
    }
  }

  /**
   * Atualizar usuário
   */
  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppErrorHandler('User not found', 404);
      }

      // Validar dados se fornecidos
      if (updateData.name !== undefined) {
        if (updateData.name.trim().length === 0) {
          throw new AppErrorHandler('Name cannot be empty', 400);
        }
        user.name = updateData.name.trim();
      }

      if (updateData.email !== undefined) {
        const existingUser = await User.findOne({
          email: updateData.email.toLowerCase(),
          _id: { $ne: id },
        });
        if (existingUser) {
          throw new AppErrorHandler('Email already registered', 409);
        }
        user.email = updateData.email.toLowerCase();
      }

      if (updateData.age !== undefined) {
        if (updateData.age < config.minAge || updateData.age > config.maxAge) {
          throw new AppErrorHandler(
            `Age must be between ${config.minAge} and ${config.maxAge}`,
            400
          );
        }
        user.age = updateData.age;
      }

      if (updateData.status !== undefined) {
        if (!['active', 'inactive'].includes(updateData.status)) {
          throw new AppErrorHandler('Invalid status', 400);
        }
        user.status = updateData.status;
      }

      await user.save();
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      if ((error as any).name === 'CastError') {
        throw new AppErrorHandler('Invalid user ID format', 400);
      }
      throw new AppErrorHandler('Failed to update user', 500);
    }
  }

  /**
   * Deletar usuário
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        throw new AppErrorHandler('User not found', 404);
      }
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      if ((error as any).name === 'CastError') {
        throw new AppErrorHandler('Invalid user ID format', 400);
      }
      throw new AppErrorHandler('Failed to delete user', 500);
    }
  }

  /**
   * Deativar usuário (soft delete)
   */
  async deactivateUser(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppErrorHandler('User not found', 404);
      }

      user.status = 'inactive';
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      if ((error as any).name === 'CastError') {
        throw new AppErrorHandler('Invalid user ID format', 400);
      }
      throw new AppErrorHandler('Failed to deactivate user', 500);
    }
  }

  /**
   * Reativar usuário
   */
  async reactivateUser(id: string): Promise<IUser> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new AppErrorHandler('User not found', 404);
      }

      user.status = 'active';
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof AppErrorHandler) {
        throw error;
      }
      if ((error as any).name === 'CastError') {
        throw new AppErrorHandler('Invalid user ID format', 400);
      }
      throw new AppErrorHandler('Failed to reactivate user', 500);
    }
  }

  /**
   * Contar usuários
   */
  async countUsers(status?: 'active' | 'inactive'): Promise<number> {
    try {
      const query = status ? { status } : {};
      return await User.countDocuments(query);
    } catch (error) {
      throw new AppErrorHandler('Failed to count users', 500);
    }
  }

  /**
   * Buscar usuário por email (para pesquisa)
   */
  async searchUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({
        email: { $regex: email, $options: 'i' },
      });
    } catch (error) {
      throw new AppErrorHandler('Failed to search user', 500);
    }
  }
}

export const userService = new UserService();
