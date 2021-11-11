import { ProductTypegooseRepository } from './product.typegoose.repository';
// import { ProductTypeormRepository } from './product.typeorm.repository';
import { IProduct, IProductService, IProductRepository, IProductQueryParams, IProductDbParams } from '../../types';
// import { DB_TYPES } from '../../helpers/constants';
import { formProductQueryParams } from '../../helpers/form-product-query-params';

// const { DB } = require('../../config');

class ProductsService implements IProductService {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  public getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  public getByParams = async (params: IProductQueryParams) => {
    try {
      const dbParams: IProductDbParams = formProductQueryParams(params);
      return await this.repository.getAndSort(dbParams.searchParams!, dbParams.sortParams!);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  public save = async (product: IProduct) => {
    try {
      return await this.repository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
}

// const repository = DB === DB_TYPES.POSTGRES ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const repository = new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
