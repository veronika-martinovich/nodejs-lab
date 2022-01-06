import { OrderListTypegooseRepository } from './order-list.typegoose.repository';
import { OrderListTypeormRepository } from './order-list.typeorm.repository';
import orderProductService from '../order-product/order-product.service';
import {
  IOrderListService,
  IOrderListRepository,
  IOrderListSearchParams,
  IOrderProductReq,
  IOrderProduct,
  IOrderListReq,
} from '../../types';
import { DB_TYPES } from '../../helpers/constants';

const { DB } = require('../../config');

class OrderListService implements IOrderListService {
  repository: IOrderListRepository;

  constructor(repository: IOrderListRepository) {
    this.repository = repository;
  }

  public async get(searchParams: IOrderListSearchParams) {
    try {
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  }

  public async save(order: IOrderListReq) {
    try {
      return await this.repository.save(order);
    } catch (error) {
      throw new Error();
    }
  }

  // public async update() {
  //   try {
  //     return await this.repository.update(__id, fieldsToUpdate);
  //   } catch (error) {
  //     throw new Error();
  //   }
  // }

  public async addProducts(userId: string, products: Array<IOrderProductReq>) {
    try {
      const newOrderProducts: Array<IOrderProduct> = [];
      products.forEach(async (item) => {
        const newOrderProduct = await orderProductService.save(item);
        newOrderProducts.push(newOrderProduct);
      });
      const orders = await this.get({ where: { userId } });
      const currentOrder = orders[0];
      const isOrderExists = !!currentOrder;

      let orderToReturn;

      if (isOrderExists) {
        newOrderProducts.forEach((item) => {
          currentOrder.products.push(item);
        });
        orderToReturn = await this.save(currentOrder);
      } else {
        orderToReturn = await this.save({ userId, products: newOrderProducts });
      }

      return orderToReturn;
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = DB === DB_TYPES.POSTGRES ? new OrderListTypeormRepository() : new OrderListTypegooseRepository();
const orderListService = new OrderListService(repository);

export default orderListService;
