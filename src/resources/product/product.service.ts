import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';
import { IProduct, IProductService, IProductRepository } from '../../types';
import { DB } from '../../constants';

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

  public save = async (product: IProduct) => {
    try {
      return await this.repository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
}

const repository = process.env.DB === DB.postgres ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
