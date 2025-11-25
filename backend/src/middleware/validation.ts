import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export interface ValidateRequest extends Request {
  validatedData?: Record<string, unknown>;
}

// Schemas de validação
export const createUserSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.max': 'Name must be less than 100 characters',
      'any.required': 'Name is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
  age: Joi.number()
    .integer()
    .min(18)
    .max(120)
    .required()
    .messages({
      'number.min': 'Age must be at least 18',
      'number.max': 'Age cannot exceed 120',
      'any.required': 'Age is required',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(100)
    .optional(),
  email: Joi.string()
    .email()
    .optional(),
  age: Joi.number()
    .integer()
    .min(18)
    .max(120)
    .optional(),
  status: Joi.string()
    .valid('active', 'inactive')
    .optional(),
}).min(1);

// Middleware de validação
export const validate = (schema: Joi.Schema) => {
  return (req: ValidateRequest, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        error: 'Validation failed',
        details: messages,
      });
      return;
    }

    req.validatedData = value;
    next();
  };
};

// Middleware para parâmetros
export const validateParams = (schema: Joi.Schema) => {
  return (req: ValidateRequest, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      const messages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      res.status(400).json({
        error: 'Invalid parameters',
        details: messages,
      });
      return;
    }

    req.validatedData = value;
    next();
  };
};

// Schema para validar ID
export const validateIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'any.required': 'ID is required',
    }),
});

// Função para validar MongoDB ObjectId
export const isValidMongoId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Middleware para validar ObjectId em parâmetros
export const validateMongoId = (req: ValidateRequest, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  
  if (!isValidMongoId(id)) {
    res.status(400).json({
      error: 'Invalid ID format',
      details: [{ field: 'id', message: 'ID must be a valid MongoDB ObjectId' }],
    });
    return;
  }
  
  next();
};
