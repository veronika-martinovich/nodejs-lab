import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../../helpers/errors';

export const validateUser = [
  check('username').exists().isString().isLength({ min: 3 }),
  check('password').exists().isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new InvalidRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];
