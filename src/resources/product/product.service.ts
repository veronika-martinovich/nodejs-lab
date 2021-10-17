import productsDA from './product.da';
import { IProduct } from '../../types';

class ProductsService {
  public getAll = async (): Promise<Array<IProduct> | unknown> => {
    try {
      return await productsDA.getAll();
    } catch (error) {
      return console.log(error);
    }
  };

  public save = async (product: IProduct): Promise<IProduct | unknown> => {
    try {
      return await productsDA.save(product);
    } catch (error) {
      return console.log(error);
    }
  };
}

const productsService = new ProductsService();

export default productsService;
