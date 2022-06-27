/* eslint-disable prettier/prettier */
import { OrderListTypegooseRepository } from './order-list.typegoose.repository';
import { OrderListTypeormRepository } from './order-list.typeorm.repository';
import orderProductService from '../order-product/order-product.service';
import {
  IOrderListService,
  IOrderListRepository,
  IOrderListSearchParams,
  IOrderListReq,
  IOrderList,
} from './order-list.types';
import { IOrderProductWhereParams, IOrderProductReq, IOrderProduct } from '../order-product/order-product.types';
import { DB_TYPES } from '../../helpers/constants';
import { NotFoundError } from '../../helpers/errors';

class OrderListService implements IOrderListService {
  repository: IOrderListRepository;

  constructor(repository: IOrderListRepository) {
    this.repository = repository;
  }

  public async get(searchParams: IOrderListSearchParams) {
    return this.repository.get(searchParams);
  }

  public async getOne(searchParams: IOrderListSearchParams) {
    const orders = await this.get(searchParams);
    const order = orders[0];
    const isOrderExists = !!order;
    return { order, isOrderExists };
  }

  public async save(order: IOrderListReq) {
    return this.repository.save(order);
  }

  public async update(order: IOrderList, orderProducts: Array<IOrderProduct>) {
    if (process.env.DB === DB_TYPES.POSTGRES) {
      return this.repository.save({ ...order, orderProducts });
    }
    const orderListProducts = [...orderProducts.map((item: IOrderProduct) => item._id)];
    return this.repository.update({ _id: order._id }, { orderProducts: orderListProducts as Array<string> });
  }

  public async addProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
    const { order: currentOrder, isOrderExists } = await this.getOne({ where: { userId } });
    if (isOrderExists) {
      const orderProductsToSave = orderProducts.map((item) =>
        process.env.DB === DB_TYPES.POSTGRES
          ? { ...item, orderList: currentOrder }
          : { ...item, orderList: currentOrder._id }
      );

      const savedOrderProducts = await orderProductService.saveMany(orderProductsToSave);
      const orderListProducts = [...currentOrder.orderProducts, ...savedOrderProducts];

      await this.update(currentOrder, orderListProducts);
    } else {
      const newOrderList = await this.save({ userId });

      const orderProductsToSave = orderProducts.map((item) =>
        process.env.DB === DB_TYPES.POSTGRES
          ? { ...item, orderList: newOrderList }
          : { ...item, orderList: newOrderList._id }
      );

      const savedOrderProducts = await orderProductService.saveMany(orderProductsToSave);

      await this.update(newOrderList, savedOrderProducts);
    }

    const { order: listOrderToReturn } = await this.getOne({ where: { userId } });

    return listOrderToReturn;
  }

  public async editProducts(userId: string, orderProducts: Array<IOrderProductReq>) {
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
  }

  public async deleteProducts(userId: string) {
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
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new OrderListTypeormRepository() : new OrderListTypegooseRepository();
const orderListService = new OrderListService(repository);

export default orderListService;
