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
  }

  // public async update() {
  //   await OrderListModel.updateOne({ _id: __id }, { ...fieldsToUpdate }).exec();
  //   const updatedProduct = await ProductModel.findOne({ _id: __id }).lean().exec();
  //   if (!updatedProduct) {
  //     throw new NotFoundError('Product was not updated');
  //   }
  //   return updatedProduct;
  // }
}
