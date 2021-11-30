import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository, IProductSearchParams } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class ProductTypegooseRepository implements IProductRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  };

  public get = async (searchParams: IProductSearchParams) => {
    const products = await ProductModel.find(searchParams.where!)
      .sort(searchParams.order)
      .skip(searchParams.skip!)
      .limit(searchParams.take!);
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    if (!newProduct) {
      throw new NotFoundError('Product was not created');
    }
    return newProduct;
  };
}
