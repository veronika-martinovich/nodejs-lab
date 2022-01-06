import { getRepository } from 'typeorm';
import { OrderProduct } from './order-product.typeorm.model';
import { IOrderProductRepository, IOrderProductReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class OrderProductTypeormRepository implements IOrderProductRepository {
  public async save(orderProduct: IOrderProductReq) {
    const orderProductRepository = getRepository(OrderProduct);
    const newOrderProduct = orderProductRepository.create({
      productId: orderProduct.productId,
      quantity: orderProduct.quantity,
    });

    const savedOrderProduct = await orderProductRepository.save(newOrderProduct);

    if (!savedOrderProduct) {
      throw new NotFoundError('Order product was not created');
    }
    return savedOrderProduct;
  }
}
