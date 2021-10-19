import productsDA from './product.da';
import { IProduct } from '../../types';

class ProductsService {
  public getAll = async (): Promise<Array<IProduct>> => {
    try {
      return await productsDA.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    try {
      return await productsDA.save(product);
    } catch (error) {
      throw new Error();
    }
  };
}

const productsService = new ProductsService();

export default productsService;
