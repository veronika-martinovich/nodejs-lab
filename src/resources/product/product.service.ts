import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';
import { IProduct, IProductService, IProductRepository, IProductQueryParams, IProductSearchParams } from '../../types';
import { DB_TYPES } from '../../helpers/constants';
import { formProductSearchParams } from '../../helpers/form-product-search-params';

const { DB } = require('../../config');

class ProductsService implements IProductService {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  public getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  public get = async (params: IProductQueryParams) => {
    try {
      const searchParams: IProductSearchParams = formProductSearchParams(params);
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  };

  public getByCategory = async ({
    id,
    limit,
    sortDirection,
    sortField,
  }: {
    id: string;
    limit?: number;
    sortDirection?: string;
    sortField?: string;
  }) => {
    try {
      const searchParams: IProductSearchParams = { where: { categoryId: id }, relations: ['category'] };
      if (!!sortField && !!sortDirection) {
        searchParams.order = { [sortField as string]: sortDirection };
      }
      if (limit) {
        searchParams.take = limit;
      }
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  };

  public save = async (product: IProduct) => {
    try {
      return await this.repository.save(product);
    } catch (error) {
      throw new Error();
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
