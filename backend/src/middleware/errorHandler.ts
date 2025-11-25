import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  status?: number;
  details?: Record<string, unknown>;
}

export class AppErrorHandler extends Error implements AppError {
  status: number;
  details?: Record<string, unknown>;

  constructor(message: string, status: number = 500, details?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, AppErrorHandler.prototype);
  }
}

export const errorHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('❌ Error:', err);

  if (err instanceof AppErrorHandler) {
    return res.status(err.status || 500).json({
      success: false,
      error: err.message,
      details: err.details,
      status: err.status,
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: (err as any).errors,
    });
  }

  // Mongoose duplicate key errors
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
      field,
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message || 'Something went wrong',
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested resource does not exist',
  });
};
