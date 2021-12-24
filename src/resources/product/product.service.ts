import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';
import userRatingsService from '../user-ratings/user-ratings.service';
import {
  IUserRating,
  IProduct,
  IProductService,
  IProductRepository,
  IProductQueryParams,
  IProductSearchParams,
  IProductFieldsToUpdate,
} from '../../types';
import { DB_TYPES } from '../../helpers/constants';
import { formProductSearchParams } from '../../helpers/form-product-search-params';

const { DB } = require('../../config');

class ProductsService implements IProductService {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  get = async (params: IProductQueryParams) => {
    try {
      const searchParams: IProductSearchParams = formProductSearchParams(params);
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  };

  getByCategory = async ({
    id,
    limit,
    sortDirection,
    sortField,
  }: {
    id: string;
    limit?: number;
    sortDirection?: string;
    sortField?: string;
  }) => {
    try {
      const searchParams: IProductSearchParams = { where: { categoryId: id }, relations: ['category'] };
      if (!!sortField && !!sortDirection) {
        searchParams.order = { [sortField as string]: sortDirection };
      }
      if (limit) {
        searchParams.take = limit;
      }
      return await this.repository.get(searchParams);
    } catch (error) {
      throw new Error();
    }
  };

  save = async (product: IProduct) => {
    console.log(product);
    try {
      return await this.repository.save(product);
    } catch (error) {
      throw new Error();
    }
  };

  update = async (__id: string, fieldsToUpdate: IProductFieldsToUpdate) => {
    try {
      return await this.repository.update(__id, fieldsToUpdate);
    } catch (error) {
      throw new Error();
    }
  };

  rate = async (userRating: IUserRating) => {
    if (DB === DB_TYPES.POSTGRES && userRating.productId) {
      const currentUserRating = await userRatingsService.get({
        where: { productId: userRating.productId, userId: userRating.userId },
      });
      const isUserRatingExist = !!currentUserRating.length;

      if (isUserRatingExist && currentUserRating[0].__id) {
        await userRatingsService.update(currentUserRating[0].__id, userRating);
      } else {
        await userRatingsService.save(userRating);
      }

      const avgRating = await userRatingsService.getAvgByProduct(userRating.productId);
      const fieldsToUpdate: IProductFieldsToUpdate = {
        totalRating: avgRating,
      };
      const updatedProduct = await this.update(userRating.productId, fieldsToUpdate);
      return updatedProduct;
    }
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
