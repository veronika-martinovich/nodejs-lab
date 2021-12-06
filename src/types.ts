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
  order?: IStringValue;
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
  displayName?: string;
  createdAt?: Date;
  products?: Array<IProduct>;
  includeTop3Products?: Array<IProduct>;
}

export interface ICategoryWhereParams {
  displayName?: string;
}

export interface ICategorySearchParams {
  where?: ICategoryWhereParams;
  order?: IStringValue;
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
  getById: (id: string) => Promise<ICategory | null>;
}

export interface ICategoryService {
  repository: ICategoryRepository;
  getAll: () => Promise<Array<ICategory>>;
  getByIdAndQueryParams: (id: string, params: ICategoryQueryParams) => Promise<ICategory | ICategoryExtended | null>;
  save: (category: ICategory) => Promise<ICategory>;
}

// User

export interface INewUser {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
}

export interface IUser {
  __id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
}

export interface IUserRepository {
  getAll: () => Promise<Array<IUser>>;
  save: (user: INewUser) => Promise<IUser>;
}

export interface IUserService {
  repository: IUserRepository;
  getAll: () => Promise<Array<IUser>>;
  save: (user: INewUser) => Promise<IUser>;
}
