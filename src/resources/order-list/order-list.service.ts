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

  public async addProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    try {
      const orders = await this.get({ where: { userId } });
      const currentOrder = orders[0];
      const isOrderExists = !!currentOrder;

      if (isOrderExists) {
        const promises = orderProducts.map(async (item) => {
          const orderProductToSave =
            DB === DB_TYPES.POSTGRES ? { ...item, orderList: currentOrder } : { ...item, orderList: currentOrder._id };
          const newOrderProduct = await orderProductService.save(orderProductToSave);
          return newOrderProduct;
        });

        await Promise.all(promises);
      } else {
        const newOrderList = await this.save({ userId });

        const promises = orderProducts.map(async (item) => {
          const orderProductToSave =
            DB === DB_TYPES.POSTGRES ? { ...item, orderList: newOrderList } : { ...item, orderList: newOrderList._id };
          const newOrderProduct = await orderProductService.save(orderProductToSave);
          return newOrderProduct;
        });

        await Promise.all(promises);
      }

      const listOrders = await this.get({ where: { userId } });
      const listOrder = listOrders[0];

      const orderProductsToReturn: Array<IOrderProduct> = await orderProductService.get({
        where: { orderList: listOrder.__id || listOrder._id },
        relations: ['product', 'orderList'],
      });
      const listOrderToReturn = { ...listOrder, orderProducts: orderProductsToReturn };

      return listOrderToReturn;
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = DB === DB_TYPES.POSTGRES ? new OrderListTypeormRepository() : new OrderListTypegooseRepository();
const orderListService = new OrderListService(repository);

export default orderListService;
