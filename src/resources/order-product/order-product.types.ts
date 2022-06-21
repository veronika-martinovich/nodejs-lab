import { IStringValue } from '../common/common.types';

export interface IOrderProductList {
  __id: string;
  userId: string;
}

export interface IOrderProduct {
  _id?: string;
  __id?: string;
  product: string;
  quantity: number;
}

export interface IOrderProductReq {
  product: string;
  quantity: number;
  orderList?: IOrderProductList | string;
  delete?: boolean;
}

export interface IOrderProductWhereParams {
  orderList: string;
  product?: Array<string>;
}

export interface IOrderProductSearchParams {
  where?: IOrderProductWhereParams | any;
  relations?: Array<string>;
  order?: IStringValue;
  skip?: number;
  take?: number;
}

export interface IOrderProductRepository {
  get(searchParams: IOrderProductSearchParams): Promise<Array<IOrderProduct | any>>;
  saveMany(orderProducts: Array<IOrderProductReq>): Promise<Array<IOrderProductReq> | any>;
  deleteMany(searchParams: IOrderProductWhereParams): Promise<number>;
  updateOne(searchParams: IOrderProductSearchParams, quantity: number): Promise<IOrderProduct | any>;
}

export interface IOrderProductService {
  repository: IOrderProductRepository;
  get(searchParams: IOrderProductSearchParams): Promise<Array<IOrderProduct>>;
  saveMany(orderProducts: Array<IOrderProductReq>): Promise<Array<IOrderProductReq>>;
  deleteMany(searchParams: IOrderProductWhereParams): Promise<number>;
  update(searchParams: IOrderProductSearchParams, quantity: number): Promise<IOrderProduct>;
}
