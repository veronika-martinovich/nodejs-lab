import { Request, Response, NextFunction } from 'express';
import { logHttpData } from './http-loggers';

const middlewareErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error',
  });

  logHttpData({ err, req, res });
  next();
};

const middlewareNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    error: {
      name: 'Invalid Request',
      status: 404,
      message: 'Route not found',
      statusCode: 404,
    },
  });

  logHttpData({ req, res });
  next();
};

const middlewareHttpLogger = (req: Request, res: Response, next: NextFunction) => {
  logHttpData({ req, res });
  next();
};

module.exports = { middlewareErrorHandler, middlewareHttpLogger, middlewareNotFoundHandler };
