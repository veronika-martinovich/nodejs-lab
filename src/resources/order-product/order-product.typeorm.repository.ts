import { getRepository } from 'typeorm';
import { OrderProduct } from './order-product.typeorm.model';
import { IOrderProductRepository, IOrderProductReq, IOrderProductSearchParams } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypeormRepository implements IOrderProductRepository {
  public async get(searchParams: IOrderProductSearchParams) {
    const orderProductRepository = getRepository(OrderProduct);
    const orderProducts = await orderProductRepository.find(searchParams);
    if (!orderProducts) {
      throw new NotFoundError('Order product not found');
    }
    return orderProducts;
  }

  public async save(orderProduct: IOrderProductReq) {
    const orderProductRepository = getRepository(OrderProduct);
    const newOrderProduct = orderProductRepository.create({
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
}
