import { Request, Response, NextFunction } from 'express';
import { logHttpData } from './http-loggers.middleware';

export const middlewareErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error',
  });

  logHttpData({ err, req, res });
  next();
};

export const middlewareNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: {
      name: 'Error',
      status: 404,
      message: 'Route not found',
      statusCode: 404,
    },
  });

  logHttpData({ req, res });
  next();
};
