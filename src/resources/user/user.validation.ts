import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../helpers/errors';
import { ROLES } from '../../constants';

export const validateUser = [
  check('username').isString().isLength({ min: 3 }),
  check('password').isLength({ min: 6 }),
  check('firstName').optional().isLength({ min: 2, max: 12 }),
  check('lastName').optional().isLength({ min: 2, max: 12 }),
  check('role').custom((value) => Object.values(ROLES).includes(value)),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    const errorFields = errors.map((item) => item.param);
    if (errors.length) {
      throw new BadRequestError(`Invalid data: ${errorFields.join(', ')}.`);
    }
    next();
  },
];
