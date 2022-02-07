import { Request, Response } from 'express';
import { UserRating } from './resources/user-rating/user-rating.typeorm.model';
import { User } from './resources/user/user.typeorm.model';
import { LastRatings } from './resources/last-ratings/last-ratings.typeorm.model';

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

// User Ratings

export interface IUserRatingReq {
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
}

export interface IUserRating {
  _id?: string;
  userId?: string;
  productId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

export interface IUserRatingSearchParams {
  where?: any;
  limit?: number;
  sortBy?: any;
}

export interface IUserRatingRepository {
  getAll(): Promise<Array<IUserRating | UserRating>>;
  get(params: IUserRatingSearchParams): Promise<Array<IUserRating | UserRating>>;
  getAvgByProduct(prodId: string): Promise<number>;
  save(userRating: IUserRating): Promise<IUserRating | UserRating | null>;
  update(id: string, userRating: IUserRating): Promise<IUserRating | UserRating | null>;
}

export interface IUserRatingService {
  repository: IUserRatingRepository;
  getAll(): Promise<Array<IUserRating>>;
  get(params: IUserRatingSearchParams): Promise<Array<IUserRating>>;
  getAvgByProduct(prodId: string): Promise<number>;
  getLastRatings(params: IUserRatingSearchParams): Promise<Array<IUserRating>>;
  save(userRating: IUserRating): Promise<IUserRating | null>;
  update(id: string, userRating: IUserRating): Promise<IUserRating | null>;
}

// Product

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

// Last Ratings

export interface ILastRating {
  _id?: string;
  userId?: string | User;
  productId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

export interface ILastRatingsRepository {
  getAll(): Promise<Array<ILastRating | LastRatings | any>>;
  save(lastRating: IUserRatingReq): Promise<ILastRating | LastRatings | any>;
}

export interface ILastRatingsService {
  repository: ILastRatingsRepository;
  getAll(): Promise<Array<ILastRating | LastRatings>>;
  save(lastRating: IUserRatingReq): Promise<ILastRating | LastRatings>;
}

// OrderProduct

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

// OrderList

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
  top3Products?: Array<IProduct>;
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
  getAll(): Promise<Array<ICategory>>;
  save(category: ICategory): Promise<ICategory>;
  getById(id: string): Promise<ICategory | null>;
}

export interface ICategoryService {
  repository: ICategoryRepository;
  getAll(): Promise<Array<ICategory>>;
  getByIdAndQueryParams(id: string, params: ICategoryQueryParams): Promise<ICategory | ICategoryExtended | null>;
  save(category: ICategory): Promise<ICategory>;
}

// User

export interface INewUser {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  role?: string;
}
export interface IUserToRegister {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export interface IUserToReturn {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  token: string;
  refreshToken?: string;
  role: string;
}
export interface IUser {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  role: string;
}

export interface ITokenList {
  [key: string]: IUserToReturn;
}

export interface IUserRepository {
  getAll(): Promise<Array<IUser>>;
  getByUsername(username: string): Promise<IUser | null>;
  getById(__id: string): Promise<IUser | null>;
  save(user: INewUser): Promise<IUser | null>;
  update(__id: string, fieldsToUpdate: INewUser): Promise<IUser>;
}

export interface IUserService {
  repository: IUserRepository;
  getAll(): Promise<Array<IUser>>;
  getByUsername(username: string): Promise<IUser | null>;
  getById(__id: string): Promise<IUser | null>;
  save(user: INewUser): Promise<IUser | null>;
  update(__id: string, fieldsToUpdate: INewUser): Promise<IUser>;
}
