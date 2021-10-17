import { ProductModel } from './product.model';
import { IProduct } from '../../types';

class ProductsDA {
  public getAll = async (): Promise<Array<IProduct> | unknown> => {
    try {
      const products = await ProductModel.find({});
      return products;
    } catch (error) {
      return console.log(error);
    }
  };

  public save = async (product: IProduct): Promise<IProduct | unknown> => {
    try {
      const newProduct = await ProductModel.create(product);
      return newProduct;
    } catch (error) {
      return console.log(error);
    }
  };
}

const productsDA = new ProductsDA();

export default productsDA;
