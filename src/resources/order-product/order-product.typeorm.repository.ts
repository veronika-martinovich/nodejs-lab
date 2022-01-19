import { getRepository } from 'typeorm';
import { OrderProduct } from './order-product.typeorm.model';
import {
  IOrderProductRepository,
  IOrderProductReq,
  IOrderProductSearchParams,
  IOrderProductWhereParams,
} from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypeormRepository implements IOrderProductRepository {
  public async get(searchParams: IOrderProductSearchParams) {
    const orderProductRepository = getRepository(OrderProduct);
    const orderProducts = await orderProductRepository.find({ ...searchParams, relations: ['product', 'orderList'] });
    if (!orderProducts) {
      throw new NotFoundError('Order product not found');
    }
    return orderProducts;
  }

  public async save(orderProduct: IOrderProductReq) {
    const orderProductRepository = getRepository(OrderProduct);
    const newOrderProduct = await orderProductRepository.create({
      product: orderProduct.product,
      quantity: orderProduct.quantity,
      orderList: orderProduct.orderList,
    } as any);

    const savedOrderProduct = await orderProductRepository.save(newOrderProduct);

    if (!savedOrderProduct) {
      throw new NotFoundError('Order product was not created');
    }
    return savedOrderProduct[0];
  }

  public async delete(searchParams: IOrderProductWhereParams) {
    const orderProductRepository = getRepository(OrderProduct);
    const result = await orderProductRepository.delete(searchParams as any);

    if (!result) {
      throw new NotFoundError('Order product was not deleted');
    }
    return Number(result.affected);
  }

  public async updateOne(searchParams: IOrderProductSearchParams, quantity: number) {
    const orderProductRepository = getRepository(OrderProduct);
    const currentOrderProduct = await this.get(searchParams);
    await orderProductRepository.update({ __id: currentOrderProduct[0].__id }, { quantity });
    const updatedOrderProduct = await orderProductRepository.find(searchParams);

    if (!updatedOrderProduct) {
      throw new NotFoundError('Order product was not updated');
    }
    return updatedOrderProduct[0];
  }
}
