import { Request, Response, NextFunction } from 'express';

const middlewareErrorHandler = (err: any, req: Request, res: Response) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error',
  });
};

const asyncErrorHandler =
  (callback: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return callback(req, res, next);
    } catch (err) {
      return next(err);
    }
  };

module.exports = { middlewareErrorHandler, asyncErrorHandler };
