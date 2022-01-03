import { ObjectId } from 'mongodb';
import { ProductModel } from './product.typegoose.model';
import { IProduct, IProductRepository, IProductSearchParams, IProductFieldsToUpdate } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class ProductTypegooseRepository implements IProductRepository {
  public async getAll() {
    const products = await ProductModel.find({});
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  }

  public async get(searchParams: IProductSearchParams) {
    const products = await ProductModel.find(searchParams.where!)
      .sort(searchParams.order)
      .skip(searchParams.skip!)
      .limit(searchParams.take!);
    if (!products) {
      throw new NotFoundError('Products not found');
    }
    return products;
  }

  public async save(product: IProduct) {
    const newProduct = await ProductModel.create(product);
    const productToReturn = await ProductModel.findOne({ _id: newProduct._id }).lean().exec();

    if (!productToReturn) {
      throw new NotFoundError('Product was not created');
    }
    return productToReturn;
  }

  public async update(__id: string, fieldsToUpdate: IProductFieldsToUpdate) {
    await ProductModel.updateOne({ _id: __id }, { ...fieldsToUpdate }).exec();
    const updatedProduct = await ProductModel.findOne({ _id: __id }).lean().exec();
    if (!updatedProduct) {
      throw new NotFoundError('Product was not updated');
    }
    return updatedProduct;
  }

  public async updateSubdocBySelectors(__id: string, querySelector: any, updateSelector: any) {
    await ProductModel.updateOne(querySelector, updateSelector).exec();
    const updatedProduct = await ProductModel.findOne({ _id: __id }).lean().exec();
    if (!updatedProduct) {
      throw new NotFoundError('Product was not updated');
    }
    return updatedProduct;
  }

  public async getAvgRating(__id: string) {
    const avgResponse = await ProductModel.aggregate([
      { $match: { _id: new ObjectId(__id) } },
      { $unwind: '$ratings' },
      {
        $group: {
          _id: null,
          avg: { $avg: '$ratings.rating' },
        },
      },
    ]).exec();

    const { avg } = avgResponse[0];

    if (!avg) {
      throw new NotFoundError('Avg rating was not calculated');
    }
    return avg;
  }
}
