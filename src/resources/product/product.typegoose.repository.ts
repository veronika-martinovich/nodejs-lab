import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository, IProductSearchParams, IProductSortParams } from '../../types';

export class ProductTypegooseRepository implements IProductRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    return products;
  };

  public getAndSort = async (searchParams: IProductSearchParams, sortParams: IProductSortParams) => {
    const products = await ProductModel.find(searchParams).sort(sortParams);
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  };
}
