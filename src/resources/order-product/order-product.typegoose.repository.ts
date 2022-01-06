import { OrderProductModel } from './order-product.typegoose.model';
import { IOrderProductRepository, IOrderProductReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypegooseRepository implements IOrderProductRepository {
  public async save(orderProduct: IOrderProductReq) {
    const newOrderProduct = await OrderProductModel.create(orderProduct);
    const orderProductToReturn = await OrderProductModel.findOne({ _id: newOrderProduct._id }).lean().exec();

    if (!orderProductToReturn) {
      throw new NotFoundError('Order product was not created');
    }
    return orderProductToReturn;
  }
}
