import { ProductTypegooseRepository } from './product.typegoose.repository';
import { ProductTypeormRepository } from './product.typeorm.repository';
import userRatingsService from '../user-rating/user-rating.service';
import lastRatingsService from '../last-ratings/last-ratings.service';
import {
  IProduct,
  IProductService,
  IProductRepository,
  IProductQueryParams,
  IProductSearchParams,
  IProductFieldsToUpdate,
} from './product.types';
import { IUserRatingReq } from '../user-rating/user-rating.types';
import { DB_TYPES } from '../../constants';
import { formProductSearchParams } from '../../helpers/form-product-search-params';
import { io } from '../../index';

class ProductsService implements IProductService {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  public async getAll() {
    return this.repository.getAll();
  }

  public async get(params: IProductQueryParams) {
    const searchParams: IProductSearchParams = formProductSearchParams(params);
    return this.repository.get(searchParams);
  }

  public async getById(id: string) {
    return this.repository.getById(id);
  }

  public async getByCategory({
    id,
    limit,
    sortDirection,
    sortField,
  }: {
    id: string;
    limit?: number;
    sortDirection?: string;
    sortField?: string;
  }) {
    const searchParams: IProductSearchParams = { where: { categoryId: id }, relations: ['category'] };
    if (!!sortField && !!sortDirection) {
      searchParams.order = { [sortField as string]: sortDirection };
    }
    if (limit) {
      searchParams.take = limit;
    }
    return this.repository.get(searchParams);
  }

  public async save(product: IProduct) {
    return this.repository.save(product);
  }

  public async update(id: string, fieldsToUpdate: IProductFieldsToUpdate) {
    return this.repository.update(id, fieldsToUpdate);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }

  public async updateSubdocBySelectors(id: string, querySelector: any, updateSelector: any) {
    return this.repository.updateSubdocBySelectors(id, querySelector, updateSelector);
  }

  public async getAvgRating(id: string) {
    return this.repository.getAvgRating(id);
  }

  public async rate(userRating: IUserRatingReq) {
    const emitNewRatingEvent = async () => {
      const lastRatings = await lastRatingsService.getAll();
      io.emit('newRating', { lastRatings });
    };

    if (process.env.DB === DB_TYPES.POSTGRES && userRating.productId) {
      const currentUserRating = await userRatingsService.get({
        where: { productId: userRating.productId, userId: userRating.userId },
      });
      const isUserRatingExist = !!currentUserRating.length;

      if (isUserRatingExist && currentUserRating[0]._id) {
        await userRatingsService.update(currentUserRating[0]._id, userRating);
      } else {
        await userRatingsService.save(userRating);
        await lastRatingsService.save(userRating);
      }

      const avgRating = await userRatingsService.getAvgByProduct(userRating.productId);
      const fieldsToUpdate: IProductFieldsToUpdate = {
        totalRating: Number(avgRating),
      };
      const updatedProduct = await this.update(userRating.productId, fieldsToUpdate);
      emitNewRatingEvent();
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
      await lastRatingsService.save(userRating);
    }

    const avgRating = await this.getAvgRating(userRating.productId);
    const fieldsToUpdate: IProductFieldsToUpdate = {
      totalRating: Number(avgRating.toFixed(2)),
    };
    const updatedProduct = await this.update(userRating.productId, fieldsToUpdate);
    emitNewRatingEvent();
    return updatedProduct;
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new ProductTypeormRepository() : new ProductTypegooseRepository();
const productsService = new ProductsService(repository);

export default productsService;
