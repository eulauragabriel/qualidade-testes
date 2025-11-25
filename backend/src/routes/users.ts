import { Router, Request, Response } from 'express';
import { userController } from '../controllers/UserController';
import { validate, createUserSchema, updateUserSchema, validateMongoId } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

/**
 * GET /api/v1/users - Listar todos os usuários com paginação
 * Query params: page, limit, status
 */
router.get('/', asyncHandler((req: Request, res: Response) => userController.getAllUsers(req, res)));

/**
 * GET /api/v1/users/active - Listar usuários ativos
 */
router.get('/active', asyncHandler((req: Request, res: Response) => userController.getActiveUsers(req, res)));

/**
 * GET /api/v1/users/search/by-email - Buscar por email
 * Query params: email
 */
router.get('/search/by-email', asyncHandler((req: Request, res: Response) => userController.getUserByEmail(req, res)));

/**
 * GET /api/v1/users/age-range - Buscar por faixa de idade
 * Query params: minAge, maxAge
 */
router.get('/age-range', asyncHandler((req: Request, res: Response) => userController.getUsersByAgeRange(req, res)));

/**
 * GET /api/v1/users/stats/count - Contar usuários
 * Query params: status (opcional)
 */
router.get('/stats/count', asyncHandler((req: Request, res: Response) => userController.countUsers(req, res)));

/**
 * GET /api/v1/users/:id - Buscar usuário por ID
 */
router.get('/:id', validateMongoId, asyncHandler((req: Request, res: Response) => userController.getUserById(req, res)));

/**
 * POST /api/v1/users - Criar novo usuário
 */
router.post('/', validate(createUserSchema), asyncHandler((req: Request, res: Response) => userController.createUser(req, res)));

/**
 * PUT /api/v1/users/:id - Atualizar usuário
 */
router.put('/:id', validateMongoId, validate(updateUserSchema), asyncHandler((req: Request, res: Response) => userController.updateUser(req, res)));

/**
 * DELETE /api/v1/users/:id - Deletar usuário
 */
router.delete('/:id', validateMongoId, asyncHandler((req: Request, res: Response) => userController.deleteUser(req, res)));

/**
 * PATCH /api/v1/users/:id/deactivate - Desativar usuário
 */
router.patch('/:id/deactivate', validateMongoId, asyncHandler((req: Request, res: Response) => userController.deactivateUser(req, res)));

/**
 * PATCH /api/v1/users/:id/reactivate - Reativar usuário
 */
router.patch('/:id/reactivate', validateMongoId, asyncHandler((req: Request, res: Response) => userController.reactivateUser(req, res)));

export default router;
