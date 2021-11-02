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

export interface IProductTypegooseRepository {
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
}

export interface IProductTypeormRepository {
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
}

export interface IProductRepository {
  repository: IProductTypegooseRepository | IProductTypeormRepository;
  getAll: () => Promise<Array<IProduct>>;
  save: (product: IProduct) => Promise<IProduct>;
}
