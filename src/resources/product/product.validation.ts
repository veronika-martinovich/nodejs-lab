import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../helpers/errors';

export const validateProductBody = [
  body('displayName').isString().isLength({ min: 2 }),
  body('totalRating').isInt({ min: 1, max: 10 }),
  body('categoryId').isString(),
  body('price').isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];

export const validateProductBodyOptional = [
  body('displayName').optional().isString().isLength({ min: 2 }),
  body('totalRating').optional().isInt({ min: 1, max: 10 }),
  body('categoryId').optional().isString(),
  body('price').optional().isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];

export const validateProductQuery = [
  query('displayName').optional().isString().isLength({ min: 2 }),
  query('minRating').optional().isInt({ min: 1, max: 10 }),
  query('price')
    .optional()
    .custom((value) => value.match(/[0-9]*:[0-9]*$/)),
  query('sortBy')
    .optional()
    .custom((value) => value.match(/[a-zA-Z]+:(asc|desc)$/)),
  query('limit').optional().isInt(),
  query('offset').optional().isInt(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];
