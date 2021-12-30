import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../helpers/errors';

export const validateCategoryBody = [
  body('displayName').isString().isLength({ min: 2 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];

export const validateCategoryQuery = [
  query('includeProducts')
    .optional()
    .custom((value) => value.match(/(true|false)$/)),
  query('includeTop3Products')
    .optional()
    .custom((value) => value.match(/(true|false)$/)),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];
