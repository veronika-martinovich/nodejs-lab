import { IProduct } from '../product/product.types';
import { IStringValue } from '../common/common.types';

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
