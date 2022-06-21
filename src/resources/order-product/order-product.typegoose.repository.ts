import { OrderProductModel } from '../common/typeoose.models';
import {
  IOrderProductRepository,
  IOrderProductReq,
  IOrderProductSearchParams,
  IOrderProductWhereParams,
} from './order-product.types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypegooseRepository implements IOrderProductRepository {
  public async get(searchParams: IOrderProductSearchParams) {
    const orderProducts = await OrderProductModel.find(searchParams.where as any)
      .sort(searchParams.order)
      .skip(searchParams.skip!)
      .limit(searchParams.take!)
      .populate('orderList')
      .populate('product');
    if (!orderProducts) {
      throw new NotFoundError('Order products not found');
    }
    return orderProducts;
  }

  public async saveMany(orderProducts: Array<IOrderProductReq>) {
    const newOrderProducts = await OrderProductModel.insertMany(orderProducts);

    if (!newOrderProducts) {
      throw new NotFoundError('Order product was not created');
    }
    return newOrderProducts;
  }

  public async deleteMany(searchParams: IOrderProductWhereParams) {
    const result = await OrderProductModel.deleteMany(searchParams as any).exec();

    if (!result) {
      throw new NotFoundError('Order product was not deleted');
    }
    return result.deletedCount;
  }

  public async updateOne(searchParams: IOrderProductSearchParams, quantity: number) {
    await OrderProductModel.updateOne(searchParams, { quantity }).lean().exec();
    const orderProduct = await OrderProductModel.findOne(searchParams).lean().exec();
    if (!orderProduct) {
      throw new NotFoundError('Order product was not updated');
    }
    return orderProduct;
  }
}
