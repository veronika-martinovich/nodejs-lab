import { OrderListModel } from '../common/typeoose.models';
import { IOrderListRepository, IOrderListSearchParams, IOrderListReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderListTypegooseRepository implements IOrderListRepository {
  public async get(searchParams: IOrderListSearchParams) {
    const orderLists = await OrderListModel.find(searchParams.where!)
      .populate('orderProducts')
      .populate('userId')
      .lean()
      .exec();

    if (!orderLists) {
      throw new NotFoundError('Order lists not found');
    }
    return orderLists;
  }

  public async save(order: IOrderListReq) {
    try {
      const newOrderList = await OrderListModel.create(order);
      const productToReturn = await OrderListModel.findOne({ _id: newOrderList._id })
        .populate('userId')
        .populate('orderProducts')
        .lean()
        .exec();

      if (!productToReturn) {
        throw new NotFoundError('Order list was not created');
      }
      return productToReturn;
    } catch (e) {
      console.log(e);
    }
  }
}
