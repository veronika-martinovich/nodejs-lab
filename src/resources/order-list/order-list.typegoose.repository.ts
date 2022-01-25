import { OrderListModel } from '../common/typeoose.models';
import {
  IOrderListRepository,
  IOrderListSearchParams,
  IOrderListReq,
  IOrderListWhereParams,
  IOrderListFieldsToUpdate,
} from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderListTypegooseRepository implements IOrderListRepository {
  public async get(searchParams: IOrderListSearchParams) {
    const orderLists = await OrderListModel.find(searchParams.where!).populate('orderProducts').lean().exec();

    if (!orderLists) {
      throw new NotFoundError('Order lists not found');
    }
    return orderLists;
  }

  public async save(order: IOrderListReq) {
    const newOrderList = await OrderListModel.create(order);
    const productToReturn = await OrderListModel.findOne({ _id: newOrderList._id })
      .populate('orderProducts')
      .lean()
      .exec();

    if (!productToReturn) {
      throw new NotFoundError('Order list was not created');
    }
    return productToReturn;
  }

  public async update(searchParams: IOrderListWhereParams, fieldsToUpdate: IOrderListFieldsToUpdate) {
    try {
      await OrderListModel.updateOne(searchParams, fieldsToUpdate as any)
        .lean()
        .exec();
      const orderList = await OrderListModel.findOne(searchParams).populate('orderProducts').lean().exec();
      if (!orderList) {
        throw new NotFoundError('Order list was not updated');
      }
      return orderList;
    } catch (e) {
      console.log(e);
    }
  }
}
