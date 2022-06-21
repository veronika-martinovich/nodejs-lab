import { IOrderProduct, IOrderProductReq } from '../order-product/order-product.types';

export interface IOrderList {
  _id?: string;
  __id?: string;
  userId: string;
  orderProducts?: Array<IOrderProduct>;
}

export interface IOrderListToSave {
  __id?: string;
  userId: string;
  orderProducts?: Array<IOrderProduct | string>;
}

export interface IOrderListReq {
  userId: string;
  orderProducts?: Array<IOrderProductReq>;
}

export interface IOrderListFieldsToUpdate {
  orderProducts: Array<string>;
}

export interface IOrderListWhereParams {
  _id?: string;
  userId?: string;
  productId?: string;
}

export interface IOrderListSearchParams {
  where?: IOrderListWhereParams;
  relations?: Array<string>;
}

export interface IOrderListRepository {
  get(searchParams: IOrderListSearchParams): Promise<Array<IOrderList | any>>;
  update(searchParams: IOrderListWhereParams, fieldsToUpdate: IOrderListFieldsToUpdate): Promise<IOrderList | any>;
  save(order: IOrderListReq): Promise<IOrderList | any>;
}

export interface IOrderListService {
  repository: IOrderListRepository;
  get(searchParams: IOrderListSearchParams): Promise<Array<IOrderList>>;
  getOne(searchParams: IOrderListSearchParams): Promise<{ order: IOrderList; isOrderExists: boolean }>;
  save(order: IOrderListReq): Promise<IOrderList>;
  update(order: IOrderList, orderProducts: Array<IOrderProduct>): Promise<IOrderList>;
  addProducts(userId: string, orderProducts: Array<IOrderProductReq>): Promise<IOrderList>;
  editProducts(userId: string, orderProducts: Array<IOrderProductReq>): Promise<IOrderList>;
  deleteProducts(userId: string): Promise<IOrderList>;
}
