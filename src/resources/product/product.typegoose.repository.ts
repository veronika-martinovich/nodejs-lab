import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository } from '../../types';
import { logMongodbQuery } from '../../helpers/mongodb-query-logger';
import { DB_METHODS } from '../../helpers/constants';

export class ProductTypegooseRepository implements IProductRepository {
  public getAll = async () => {
    const products = await ProductModel.find({});
    logMongodbQuery({ method: DB_METHODS.GET_ALL, data: products });
    return products;
  };

  public save = async (product: IProduct) => {
    const newProduct = await ProductModel.create(product);
    logMongodbQuery({ method: DB_METHODS.SAVE, data: newProduct });
    return newProduct;
  };
}
