import { IUserRating, IUserRatingReq } from '../user-rating/user-rating.types';
import { IStringValue } from '../common/common.types';

export interface IProduct {
  __id?: string;
  displayName: string;
  categoryId?: string;
  createdAt?: Date;
  totalRating: number;
  price: number;
  ratings?: Array<IUserRating>;
}

export interface IProductFieldsToUpdate {
  displayName?: string;
  categoryId?: string;
  totalRating?: number;
  price?: number;
}

export interface IProductQueryParams {
  __id?: string;
  displayName?: string;
  createdAt?: Date;
  minRating?: string;
  price?: string;
  sortBy?: string;
  offset?: string;
  limit?: string;
}

export interface IProductWhereParams {
  __id?: string;
  _id?: string;
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
  getAll(): Promise<Array<IProduct>>;
  save(product: IProduct): Promise<IProduct>;
  get(searchParams: IProductSearchParams): Promise<Array<IProduct>>;
  getById(id: string): Promise<IProduct>;
  deleteById(id: string): Promise<IProduct | any>;
  update(id: string, fieldsToUpdate: IProductFieldsToUpdate): Promise<IProduct>;
  updateSubdocBySelectors(id: string, querySelector: any, updateSelector: any): Promise<IProduct | void>;
  getAvgRating(id: string): Promise<number>;
}

export interface IProductService {
  repository: IProductRepository;
  getAll(): Promise<Array<IProduct>>;
  get(params: IProductQueryParams): Promise<Array<IProduct> | null>;
  getById(id: string): Promise<IProduct>;
  deleteById(id: string): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  update(id: string, fieldsToUpdate: IProductFieldsToUpdate): Promise<IProduct>;
  updateSubdocBySelectors(id: string, querySelector: any, updateSelector: any): Promise<IProduct | void>;
  getAvgRating(id: string): Promise<number>;
  getByCategory({
    id,
    limit,
    sortDirection,
    sortField,
  }: {
    id: string;
    limit?: number;
    sortDirection?: string;
    sortField?: string;
  }): Promise<Array<IProduct>>;
  rate(userRating: IUserRatingReq): Promise<IProduct>;
}

export interface IProductController {
  get(params: IProductQueryParams): Promise<Array<IProduct> | null>;
  create(product: IProduct): Promise<IProduct>;
  rate(userRating: IUserRatingReq): Promise<IProduct>;
}
