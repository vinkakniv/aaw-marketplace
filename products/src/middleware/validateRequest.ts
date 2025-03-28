import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from './errorHandler';

interface ValidateSchema {
    params?: AnyZodObject;
    query?: AnyZodObject;
    body?: AnyZodObject;
}

export const validateRequest = (schema: ValidateSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.params) {
                req.params = await schema.params.parseAsync(req.params);
            }
            if (schema.query) {
                req.query = await schema.query.parseAsync(req.query);
            }
            if (schema.body) {
                req.body = await schema.body.parseAsync(req.body);
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                next(new ValidationError(error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))));
            } else {
                next(error);
            }
        }
    };
};