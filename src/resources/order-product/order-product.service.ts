import { OrderProductTypegooseRepository } from './order-product.typegoose.repository';
import { OrderProductTypeormRepository } from './order-product.typeorm.repository';
import { IOrderProductService, IOrderProductRepository, IOrderProductReq } from '../../types';
import { DB_TYPES } from '../../helpers/constants';

const { DB } = require('../../config');

class OrderProductService implements IOrderProductService {
  repository: IOrderProductRepository;

  constructor(repository: IOrderProductRepository) {
    this.repository = repository;
  }

  public async save(orderProduct: IOrderProductReq) {
    try {
      return await this.repository.save(orderProduct);
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
}

const repository =
  DB === DB_TYPES.POSTGRES ? new OrderProductTypeormRepository() : new OrderProductTypegooseRepository();
const orderProductService = new OrderProductService(repository);

export default orderProductService;
