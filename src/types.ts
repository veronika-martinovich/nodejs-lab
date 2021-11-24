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

export interface IBooleanKeyValue {
  [key: string]: boolean;
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
  categoryId?: string;
}
export interface IProductSearchParams {
  where?: IProductWhereParams;
  order?: IStringKeyValue;
  skip?: number;
  take?: number;
  relations?: Array<string>;
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
  getByCategory: ({
    id,
    limit,
    sortDirection,
    sortField,
  }: {
    id: string;
    limit?: number;
    sortDirection?: string;
    sortField?: string;
  }) => Promise<Array<IProduct>>;
}

// Category

export interface ICategory {
  __id?: string;
  displayName: string;
  createdAt?: Date;
}

export interface ICategoryExtended {
  __id?: string;
  displayName: string;
  createdAt?: Date;
  products?: Array<IProduct>;
  includeTop3Products?: Array<IProduct>;
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
  includeProducts?: string;
  includeTop3Products?: string;
}

export interface ICategoryRepository {
  getAll: () => Promise<Array<ICategory>>;
  save: (category: ICategory) => Promise<ICategory>;
  getById: (id: string) => Promise<ICategory | null | any>;
}

export interface ICategoryService {
  repository: ICategoryRepository;
  getAll: () => Promise<Array<ICategory>>;
  getByIdAndQueryParams: (id: string, params: ICategoryQueryParams) => Promise<ICategory | ICategoryExtended | null>;
  save: (category: ICategory) => Promise<ICategory>;
}
