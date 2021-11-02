// import productTypegooseRepository from './product.typegoose.repository';
import productRepository from './product.repository';
import { IProduct } from '../../types';

class ProductsService {
  public getAll = async (): Promise<Array<IProduct>> => {
    try {
      return await productRepository.getAll();
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    try {
      return await productRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
}

const productsService = new ProductsService();

export default productsService;
