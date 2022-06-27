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
    return this.repository.get(searchParams);
  }

  public async saveMany(orderProducts: Array<IOrderProductReq>) {
    return this.repository.saveMany(orderProducts);
  }

  public async deleteMany(searchParams: IOrderProductWhereParams) {
    return this.repository.deleteMany(searchParams);
  }

  public async update(searchParams: IOrderProductSearchParams, quantity: number) {
    return this.repository.updateOne(searchParams, quantity);
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new OrderProductTypeormRepository() : new OrderProductTypegooseRepository();

const orderProductService = new OrderProductService(repository);

export default orderProductService;
