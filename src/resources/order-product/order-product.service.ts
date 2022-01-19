import { OrderProductTypegooseRepository } from './order-product.typegoose.repository';
import { OrderProductTypeormRepository } from './order-product.typeorm.repository';
import {
  IOrderProductService,
  IOrderProductRepository,
  IOrderProductReq,
  IOrderProductSearchParams,
  IOrderProductWhereParams,
} from '../../types';
import { DB_TYPES } from '../../helpers/constants';

const { DB } = require('../../config');

class OrderProductService implements IOrderProductService {
  repository: IOrderProductRepository;

  constructor(repository: IOrderProductRepository) {
    this.repository = repository;
  }

  public async get(searchParams: IOrderProductSearchParams) {
    try {
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  }

  public async save(orderProduct: IOrderProductReq) {
    try {
      return await this.repository.save(orderProduct);
    } catch (error) {
      throw new Error();
    }
  }

  public async delete(searchParams: IOrderProductWhereParams) {
    try {
      return await this.repository.delete(searchParams);
    } catch (error) {
      throw new Error();
    }
  }

  public async update(searchParams: IOrderProductSearchParams, quantity: number) {
    try {
      return await this.repository.updateOne(searchParams, quantity);
    } catch (error) {
      throw new Error();
    }
  }
}

const repository =
  DB === DB_TYPES.POSTGRES ? new OrderProductTypeormRepository() : new OrderProductTypegooseRepository();

const orderProductService = new OrderProductService(repository);

export default orderProductService;
