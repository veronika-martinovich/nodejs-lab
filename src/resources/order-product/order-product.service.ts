import { OrderProductTypegooseRepository } from './order-product.typegoose.repository';
import { OrderProductTypeormRepository } from './order-product.typeorm.repository';
import {
  IOrderProductService,
  IOrderProductRepository,
  IOrderProductReq,
  IOrderProductSearchParams,
  IOrderProductWhereParams,
} from './order-product.types';
import { DB_TYPES } from '../../helpers/constants';

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

  public async saveMany(orderProducts: Array<IOrderProductReq>) {
    try {
      return await this.repository.saveMany(orderProducts);
    } catch (error) {
      throw new Error();
    }
  }

  public async deleteMany(searchParams: IOrderProductWhereParams) {
    try {
      return await this.repository.deleteMany(searchParams);
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
  process.env.DB === DB_TYPES.POSTGRES ? new OrderProductTypeormRepository() : new OrderProductTypegooseRepository();

const orderProductService = new OrderProductService(repository);

export default orderProductService;
