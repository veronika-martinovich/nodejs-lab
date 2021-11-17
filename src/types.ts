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

export interface IStringKeyValue {
  [key: string]: string;
}
// Product

export interface IProduct {
  __id?: string;
  displayName: string;
  categoryId?: string;
  createdAt?: Date;
  totalRating: number;
  price: number;
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
export interface IProductSearchParams {
  where?: IProductWhereParams;
  order?: IStringKeyValue;
  skip?: number;
  take?: number;
}

export interface IProductRepository {
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
  get: (searchParams: IProductSearchParams) => Promise<Array<IProduct>>;
}

export interface IProductService {
  repository: IProductRepository;
  getAll: () => Promise<Array<IProduct>>;
  get: (params: IProductQueryParams) => Promise<Array<IProduct> | null>;
  save: (product: IProduct) => Promise<IProduct>;
}

// Category

export interface ICategory {
  __id?: string;
  displayName: string;
  createdAt?: Date;
}

export interface ICategoryWhereParams {
  displayName?: string;
}

export interface ICategorySearchParams {
  where?: ICategoryWhereParams;
  order?: IStringKeyValue;
  skip?: number;
  take?: number;
}

export interface ICategoryQueryParams {
  displayName?: string;
  createdAt?: Date;
}

export interface ICategoryRepository {
  getAll: () => Promise<Array<ICategory>>;
  save: (category: ICategory) => Promise<ICategory>;
  get: (searchParams: ICategorySearchParams) => Promise<Array<ICategory>>;
}

export interface ICategoryService {
  repository: ICategoryRepository;
  getAll: () => Promise<Array<ICategory>>;
  get: (params: ICategoryQueryParams) => Promise<Array<ICategory>>;
  save: (category: ICategory) => Promise<ICategory>;
}
