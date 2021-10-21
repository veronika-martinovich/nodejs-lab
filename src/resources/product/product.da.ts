import { ProductModel } from './product.model';
import { IProduct } from '../../types';

class ProductsDA {
  public getAll = async (): Promise<Array<IProduct>> => {
    const products = await ProductModel.find({});
    return products;
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}

const productsDA = new ProductsDA();

export default productsDA;
