import { Request, Response, NextFunction } from 'express';
import { ROLES } from '../constants';
import { ForbiddenError } from '../helpers/errors';

export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user && user.role === ROLES.ADMIN) {
    next();
  } else {
    throw new ForbiddenError('User does not have an admin role');
  }
};
