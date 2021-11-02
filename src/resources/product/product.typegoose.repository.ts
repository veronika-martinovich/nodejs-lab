import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductTypegooseRepository } from '../../types';

export class ProductTypegooseRepository implements IProductTypegooseRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}
