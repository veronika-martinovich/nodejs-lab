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

export interface IMongoDBRange {
  $gte?: number;
  $lte?: number;
}

export interface IProductQueryParams {
  displayName?: string;
  createdAt?: Date;
  minRating?: string;
  price?: string;
  sortBy?: string;
  offset?: string;
  limit?: string;
}

export interface IProductWhereParams {
  displayName?: string;
  createdAt?: Date;
  totalRating?: any;
  price?: any;
}

export interface IProductOrderParams {
  [key: string]: string;
}

export interface IProductSearchParams {
  where?: IProductWhereParams;
  order?: IProductOrderParams;
  skip?: number;
  take?: number;
}

export interface IProductRepository {
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
  getAndSort: (searchParams: IProductSearchParams) => Promise<Array<IProduct>>;
}

export interface IProductService {
  repository: IProductRepository;
  getAll: () => Promise<Array<IProduct>>;
  getByParams: (params: IProductQueryParams) => Promise<Array<IProduct> | null>;
  save: (product: IProduct) => Promise<IProduct>;
}

export interface IHttpLoggerProps {
  err?: any;
  req?: Request;
  res?: Response;
}
