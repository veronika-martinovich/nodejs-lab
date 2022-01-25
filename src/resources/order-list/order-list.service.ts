/* eslint-disable prettier/prettier */
import { OrderListTypegooseRepository } from './order-list.typegoose.repository';
import { OrderListTypeormRepository } from './order-list.typeorm.repository';
import orderProductService from '../order-product/order-product.service';
import {
  IOrderListService,
  IOrderListRepository,
  IOrderProductWhereParams,
  IOrderListSearchParams,
  IOrderProductReq,
  IOrderProduct,
  IOrderListReq,
  IOrderList,
} from '../../types';
import { DB_TYPES } from '../../helpers/constants';
import { NotFoundError } from '../../helpers/errors';

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

  public async getOne(searchParams: IOrderListSearchParams) {
    try {
      const orders = await this.get(searchParams);
      const order = orders[0];
      const isOrderExists = !!order;
      return { order, isOrderExists };
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

  public async update(order: IOrderList, orderProducts: Array<IOrderProduct>) {
    try {
      if (DB === DB_TYPES.POSTGRES) {
        return await this.repository.save({ ...order, orderProducts });
      }
      const orderListProducts = [...orderProducts.map((item: IOrderProduct) => item._id)];
        return await this.repository.update({ _id: order._id }, { orderProducts: orderListProducts as Array<string> });
    } catch (error) {
      throw new Error();
    }
  }

  public async addProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    try {
      const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });
      if (isOrderExists) {
        const orderProductsToSave = orderProducts.map((item) =>
          (DB === DB_TYPES.POSTGRES ? { ...item, orderList: currentOrder } : { ...item, orderList: currentOrder._id }));

          const savedOrderProducts = await orderProductService.saveMany(orderProductsToSave);
          const orderListProducts = [...currentOrder.orderProducts, ...savedOrderProducts];

          await this.update(currentOrder, orderListProducts);
          } else {
        const newOrderList = await this.save({ userId });

        const orderProductsToSave = orderProducts.map((item) =>
          (DB === DB_TYPES.POSTGRES ? { ...item, orderList: newOrderList } : { ...item, orderList: newOrderList._id }));

          const savedOrderProducts = await orderProductService.saveMany(orderProductsToSave);

          await this.update(newOrderList, savedOrderProducts);
      }

      const { order: listOrderToReturn } = await this.getOne({ where: { userId } });

      return listOrderToReturn;
    } catch (error) {
      throw new Error();
    }
  }

  public async editProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    try {
      const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });

      if (isOrderExists) {
        const orderProductsToDelete: Array<string> = [];
        const orderProductsToUpdate: Array<IOrderProductReq> = [];

        orderProducts.forEach(async (item) => {
          if (item.delete) {
              orderProductsToDelete.push(item.product);
          } else {
            orderProductsToUpdate.push(item);
          }
        });

        if (orderProductsToDelete.length) {
          const searchParamsToDelete: IOrderProductWhereParams = {
            orderList: currentOrder._id || currentOrder.__id,
            product: orderProductsToDelete,
          };

          await orderProductService.deleteMany(searchParamsToDelete);

          const orderListProducts: Array<IOrderProduct> = [];
          currentOrder.orderProducts.forEach((item: IOrderProduct) => {
            if (!orderProductsToDelete.includes(item.product.toString())) orderListProducts.push(item);
          });
          await this.update(currentOrder, orderListProducts);
        }

        if (orderProductsToUpdate.length) {
          const promises = orderProductsToUpdate.map(async (item) => {
            const updatedOrderProduct = await orderProductService.update(
              {
                where: { orderList: currentOrder._id || currentOrder.__id, product: item.product },
              },
              item.quantity
            );
            return updatedOrderProduct;
          });

          await Promise.all(promises);
        }

        const { order: listOrderToReturn } = await this.getOne({ where: { userId } });

        return listOrderToReturn;
      }
      throw new NotFoundError('Order list not found');
    } catch (error) {
      throw new Error();
    }
  }

  public async deleteProducts(userId: string) {
    try {
      const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });

      if (isOrderExists) {
        await orderProductService.deleteMany({
          orderList: currentOrder._id || currentOrder.__id,
        });
        await this.update(currentOrder, []);
        const { order: listOrderToReturn } = await this.getOne({ where: { userId } });

        return listOrderToReturn;
      }
      throw new NotFoundError('Order list not found');
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = DB === DB_TYPES.POSTGRES ? new OrderListTypeormRepository() : new OrderListTypegooseRepository();
const orderListService = new OrderListService(repository);

export default orderListService;
