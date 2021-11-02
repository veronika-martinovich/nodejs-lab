import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';

import { IProduct, IProductRepository, IProductTypegooseRepository, IProductTypeormRepository } from '../../types';
import { DB } from '../../constants';

class ProductRepository implements IProductRepository {
  repository: IProductTypegooseRepository | IProductTypeormRepository;

  constructor(repository: IProductTypegooseRepository | IProductTypeormRepository) {
    this.repository = repository;
  }

  public getAll = async (): Promise<Array<IProduct>> => {
    const products = await this.repository.getAll();
    return products;
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    const newProduct = await this.repository.save(product);
    return newProduct;
  };
}

const repository = process.env.DB === DB.postgres ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productRepository = new ProductRepository(repository);

export default productRepository;
