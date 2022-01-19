import { OrderProductModel } from '../common/typeoose.models';
import {
  IOrderProductRepository,
  IOrderProductReq,
  IOrderProductSearchParams,
  IOrderProductWhereParams,
} from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypegooseRepository implements IOrderProductRepository {
  public async get(searchParams: IOrderProductSearchParams) {
    const orderProducts = await OrderProductModel.find(searchParams.where!)
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

  public async save(orderProduct: IOrderProductReq) {
    const newOrderProduct = await OrderProductModel.create(orderProduct);
    const orderProductToReturn = await OrderProductModel.findOne({ _id: newOrderProduct._id })
      .populate('orderList')
      .populate('product')
      .lean()
      .exec();

    if (!orderProductToReturn) {
      throw new NotFoundError('Order product was not created');
    }
    return orderProductToReturn;
  }

  public async delete(searchParams: IOrderProductWhereParams) {
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
