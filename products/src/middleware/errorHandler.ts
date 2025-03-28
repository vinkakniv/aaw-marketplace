import { Request, Response, NextFunction } from 'express';

export class ValidationError extends Error {
  constructor(public details: { field: string; message: string }[]) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'error',
      error: {
        type: 'ValidationError',
        details: err.details
      }
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: 'error',
      error: {
        type: 'NotFoundError',
        message: err.message
      }
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      status: 'error',
      error: {
        type: 'UnauthorizedError',
        message: err.message
      }
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    error: {
      type: 'InternalServerError',
      message: 'An unexpected error occurred'
    }
  });
}; 