import { IError } from '../types';

export class InvalidRequestError extends Error implements IError {
  statusCode: number;

  message: string;

  constructor(message: string) {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}