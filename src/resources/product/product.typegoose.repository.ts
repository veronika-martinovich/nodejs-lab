import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository } from '../../types';

export class ProductTypegooseRepository implements IProductRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}
