import { Request, Response } from 'express';

const middlewareErrorHandler = (err: any, req: Request, res: Response) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    statusCode: statusCode || 500,
    message: statusCode ? message : 'Internal Server Error',
  });
};

module.exports = { middlewareErrorHandler };
