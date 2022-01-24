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

  public async getOneWithOrderProducts(searchParams: IOrderListSearchParams) {
    try {
      const { order } = await this.getOne(searchParams);
      const orderProducts: Array<IOrderProduct> = await orderProductService.get({
        where: { orderList: order._id || order.__id },
      });
      return { ...order, orderProducts };
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

  public async addProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    try {
      const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });

      if (isOrderExists) {
        const orderProductsToSave = orderProducts.map((item) =>
          (DB === DB_TYPES.POSTGRES ? { ...item, orderList: currentOrder } : { ...item, orderList: currentOrder._id }));
        await orderProductService.saveMany(orderProductsToSave);
      } else {
        const newOrderList = await this.save({ userId });

        const orderProductsToSave = orderProducts.map((item) =>
          (DB === DB_TYPES.POSTGRES ? { ...item, orderList: newOrderList } : { ...item, orderList: newOrderList._id }));
        await orderProductService.saveMany(orderProductsToSave);
      }
      const listOrderToReturn = await this.getOneWithOrderProducts({ where: { userId } });

      return listOrderToReturn;
    } catch (error) {
      throw new Error();
    }
  }

  public async editProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    try {
      const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });

      if (isOrderExists) {
        const searchParamsToDelete: IOrderProductWhereParams = {
          orderList: currentOrder._id || currentOrder.__id,
          product: [],
        };
        const orderProductsToUpdatePromises: Array<Promise<IOrderProduct>> = [];
        orderProducts.forEach(async (item) => {
          if (item.delete) {
            if (Array.isArray(searchParamsToDelete.product)) searchParamsToDelete.product.push(item.product);
          } else {
            const promise = await orderProductService.update(
              {
                where: { orderList: currentOrder._id || currentOrder.__id, product: item.product },
              },
              item.quantity
            );
            orderProductsToUpdatePromises.push(promise);
          }
        });

        if (Array.isArray(searchParamsToDelete.product) && !!searchParamsToDelete.product.length) {
          await orderProductService.deleteMany(searchParamsToDelete);
        }
        if (orderProductsToUpdatePromises.length) await Promise.all(orderProductsToUpdatePromises);

        const listOrderToReturn: IOrderList = await this.getOneWithOrderProducts({ where: { userId } });

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

        const listOrderToReturn: IOrderList = await this.getOneWithOrderProducts({ where: { userId } });

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
