import { Request, Response } from 'express';

export interface IMongoDBRange {
  $gte?: number;
  $lte?: number;
}

export interface IHttpLoggerProps {
  err?: any;
  req?: Request;
  res?: Response;
}

export interface IStringValue {
  [key: string]: string;
}

export interface IBooleanValue {
  [key: string]: boolean;
}

export interface IBooleanKeyValue {
  [key: string]: boolean;
}

export interface IError {
  statusCode?: number;
  message?: string;
}

export interface IValidationParams {
  displayName?: string;
  categoryId?: string;
  createdAt?: Date;
  totalRating?: number;
  price?: string;
  sortBy?: string;
  offset?: string;
  limit?: string;
  minRating?: string;
  includeProducts?: string;
  includeTop3Products?: string;
}
