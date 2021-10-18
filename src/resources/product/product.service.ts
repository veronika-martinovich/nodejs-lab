import productsDA from './product.da';
import { IProduct } from '../../types';

const { InternalServerError } = require('../../errors');

class ProductsService {
  public getAll = async (): Promise<Array<IProduct> | unknown> => {
    try {
      return await productsDA.getAll();
    } catch (error) {
      return new InternalServerError(500, 'Internal server error');
    }
  };

  public save = async (product: IProduct): Promise<IProduct | unknown> => {
    try {
      return await productsDA.save(product);
    } catch (error) {
      return new InternalServerError(500, 'Internal server error');
    }
  };
}

const productsService = new ProductsService();

export default productsService;
