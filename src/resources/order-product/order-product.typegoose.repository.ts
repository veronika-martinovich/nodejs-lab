import { OrderProductModel } from './order-product.typegoose.model';
import { IOrderProductRepository, IOrderProductReq, IOrderProductSearchParams } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypegooseRepository implements IOrderProductRepository {
  public async get(searchParams: IOrderProductSearchParams) {
    const orderProducts = await OrderProductModel.find(searchParams.where!)
      .sort(searchParams.order)
      .skip(searchParams.skip!)
      .limit(searchParams.take!);
    if (!orderProducts) {
      throw new NotFoundError('Order products not found');
    }
    return orderProducts;
  }

  public async save(orderProduct: IOrderProductReq) {
    const newOrderProduct = await OrderProductModel.create(orderProduct);
    const orderProductToReturn = await OrderProductModel.findOne({ _id: newOrderProduct._id }).lean().exec();

    if (!orderProductToReturn) {
      throw new NotFoundError('Order product was not created');
    }
    return orderProductToReturn;
  }
}