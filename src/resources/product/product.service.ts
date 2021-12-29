import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';
import userRatingsService from '../user-rating/user-rating.service';
import {
  IUserRatingReq,
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

  updateSubdocBySelectors = async (__id: string, querySelector: any, updateSelector: any) => {
    try {
      return await this.repository.updateSubdocBySelectors(__id, querySelector, updateSelector);
    } catch (error) {
      throw new Error();
    }
  };

  getAvgRating = async (__id: string) => {
    try {
      return await this.repository.getAvgRating(__id);
    } catch (error) {
      throw new Error();
    }
  };

  rate = async (userRating: IUserRatingReq) => {
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

    const products = await this.get({
      __id: userRating.productId,
    });

    const productToRate = products[0];

    const currentUserRating =
      productToRate &&
      productToRate.ratings &&
      productToRate.ratings.filter((item) => item.userId === userRating.userId);

    const isUserRatingExist = currentUserRating && !!currentUserRating.length;

    if (isUserRatingExist && currentUserRating) {
      await this.updateSubdocBySelectors(
        userRating.productId,
        {
          _id: userRating.productId,
          'ratings.userId': userRating.userId,
        },
        {
          $set: { 'ratings.$': userRating },
        }
      );
    } else {
      productToRate.ratings?.push(userRating);
      await this.save(productToRate);
    }

    const avgRating = await this.getAvgRating(userRating.productId);
    const fieldsToUpdate: IProductFieldsToUpdate = {
      totalRating: avgRating,
    };
    const updatedProduct = await this.update(userRating.productId, fieldsToUpdate);
    return updatedProduct;
  };
}

const repository = DB === DB_TYPES.POSTGRES ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
