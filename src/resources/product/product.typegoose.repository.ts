import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository, IProductSearchParams } from '../../types';

export class ProductTypegooseRepository implements IProductRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    return products;
  };

  public getAndSort = async (searchParams: IProductSearchParams) => {
    const products = await ProductModel.find(searchParams.where!).sort(searchParams.order);
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}
