import { Request, Response } from 'express';

export interface IProduct {
  __id?: string;
  displayName: string;
  categoryId?: string;
  createdAt?: Date;
  totalRating: number;
  price: number;
}

export interface ICategory {
  __id?: string;
  displayName: string;
  createdAt?: Date;
}

export interface IProductRepository {
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
}

export interface IProductService {
  repository: IProductRepository;
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
}

export interface IHttpLoggerProps {
  err?: any;
  req?: Request;
  res?: Response;
}
