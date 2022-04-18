import { UserRatingTypeormRepository } from './user-rating.typeorm.repository';
import {
  IUserRatingSearchParams,
  IUserRating,
  IUserRatingService,
  IUserRatingRepository,
  IProduct,
  IUserRatingReq,
} from '../../types';
import { SORTING_ORDER, DB_TYPES } from '../../helpers/constants';
import productsService from '../product/product.service';

class UserRatingService implements IUserRatingService {
  repository: IUserRatingRepository;

  constructor(repository: IUserRatingRepository) {
    this.repository = repository;
  }

  public async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  }

  public async getAvgByProduct(prodId: string) {
    try {
      return await this.repository.getAvgByProduct(prodId);
    } catch (error) {
      throw new Error();
    }
  }

  public async get(params: IUserRatingSearchParams) {
    try {
      return await this.repository.get(params);
    } catch (error) {
      throw new Error();
    }
  }

  public async getLastRatings() {
    try {
      if (process.env.DB === DB_TYPES.POSTGRES) {
        const searchParams = {
          limit: 10,
          sortBy: {
            createdAt: SORTING_ORDER.DESC.toUpperCase(),
          },
        };
        return await this.repository.get(searchParams);
      }
      const userRatings: Array<IUserRating> = [];
      const products = await productsService.getAll();
      products.forEach((item: IProduct) => {
        if (item.ratings) {
          item.ratings.forEach((i) => {
            if (i.createdAt) {
              userRatings.push(i);
            }
          });
        }
      });
      const lastRatings = userRatings
        .sort((a, b) => new Date(b.createdAt!).valueOf() - new Date(a.createdAt!).valueOf())
        .slice(0, 10);

      return lastRatings;
    } catch (error) {
      throw new Error();
    }
  }

  public async save(userRating: IUserRating) {
    try {
      return await this.repository.save(userRating);
    } catch (error) {
      throw new Error();
    }
  }

  public async update(id: string, userRating: IUserRatingReq) {
    try {
      return await this.repository.update(id, userRating);
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = new UserRatingTypeormRepository();
const userRatingsService = new UserRatingService(repository);

export default userRatingsService;
