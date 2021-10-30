import { ProductModel } from './product.typegoose.model';
import { IProduct } from '../../types';

class ProductTypegooseRepository {
  public getAll = async (): Promise<Array<IProduct>> => {
    const products = await ProductModel.find({});
    return products;
  };

  public save = async (product: IProduct): Promise<IProduct> => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}

const productTypegooseRepository = new ProductTypegooseRepository();

export default productTypegooseRepository;
