import ProductsDA from './product.da';
import { Product } from './product.model';

class ProductsService {
  public getAll = async (): Promise<Array<Product> | unknown> => {
    try {
      return await ProductsDA.getAll();
    } catch (error) {
      return console.log(error);
    }
  };

  public save = async (product: Product): Promise<Product | unknown> => {
    try {
      return await ProductsDA.save(product);
    } catch (error) {
      return console.log(error);
    }
  };
}

export default ProductsService;
