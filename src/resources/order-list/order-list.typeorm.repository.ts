import { getRepository } from 'typeorm';
import { OrderList } from './order-list.typeorm.model';
import { IOrderListSearchParams, IOrderListRepository, IOrderListReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderListTypeormRepository implements IOrderListRepository {
  public async get(searchParams: IOrderListSearchParams) {
    const orderListRepository = getRepository(OrderList);
    const orderLists = await orderListRepository.find(searchParams);
    if (!orderLists) {
      throw new NotFoundError('Order lists not found');
    }
    return orderLists;
  }

  public async save(order: IOrderListReq) {
    const orderListRepository = getRepository(OrderList);
    const newOrderList = await orderListRepository.create({
      userId: order.userId,
    } as any);

    const savedOrderList = await orderListRepository.save(newOrderList);
    if (!savedOrderList) {
      throw new NotFoundError('Product list was not created');
    }
    return savedOrderList;
  }

  // public async update(__id: string, fieldsToUpdate: IProductFieldsToUpdate) {
  //   const productRepository = getRepository(Product);
  //   await productRepository.update({ __id }, { ...fieldsToUpdate });
  //   const updatedProduct = await productRepository.find({ where: { __id } });

  //   if (!updatedProduct) {
  //     throw new NotFoundError('Product was not updated');
  //   }
  //   return updatedProduct[0];
  // }
}
