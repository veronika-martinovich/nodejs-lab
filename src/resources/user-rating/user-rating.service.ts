import { UserRatingTypeormRepository } from './user-rating.typeorm.repository';
import {
  IUserRatingSearchParams,
  IUserRating,
  IUserRatingService,
  IUserRatingRepository,
  IUserRatingReq,
} from './user-rating.types';
import { IProduct } from '../product/product.types';
import { SORTING_ORDER, DB_TYPES } from '../../helpers/constants';
import productsService from '../product/product.service';

class UserRatingService implements IUserRatingService {
  repository: IUserRatingRepository;

  constructor(repository: IUserRatingRepository) {
    this.repository = repository;
  }

  public async getAll() {
    return this.repository.getAll();
  }

  public async getAvgByProduct(prodId: string) {
    return this.repository.getAvgByProduct(prodId);
  }

  public async get(params: IUserRatingSearchParams) {
    return this.repository.get(params);
  }

  public async getLastRatings() {
    if (process.env.DB === DB_TYPES.POSTGRES) {
      const searchParams = {
        limit: 10,
        sortBy: {
          createdAt: SORTING_ORDER.DESC.toUpperCase(),
        },
      };
      return this.repository.get(searchParams);
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
  }

  public async save(userRating: IUserRating) {
    return this.repository.save(userRating);
  }

  public async update(id: string, userRating: IUserRatingReq) {
    return this.repository.update(id, userRating);
  }
}

const repository = new UserRatingTypeormRepository();
const userRatingsService = new UserRatingService(repository);

export default userRatingsService;
