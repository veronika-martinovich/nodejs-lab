// import productTypegooseRepository from './product.typegoose.repository';
import productTypeOrmRepository from './product.typeOrm.repository';
import { IProduct } from '../../types';

class ProductsService {
  public getAll = async (): Promise<Array<IProduct>> => {
    try {
      return await productTypeOrmRepository.getAll();
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    try {
      return await productTypeOrmRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
}

const productsService = new ProductsService();

export default productsService;
