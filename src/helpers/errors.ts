import { IError } from '../types';

export class BadRequestError extends Error implements IError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super();
    this.statusCode = 400;
    this.message = message;
  }
}

export class NotFoundError extends Error implements IError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}

export class ForbiddenError extends Error implements IError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}

export class UnauthorizedError extends Error implements IError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super();
    this.statusCode = 401;
    this.message = message;
  }
}
