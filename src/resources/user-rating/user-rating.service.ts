import { UserRatingTypeormRepository } from './user-rating.typeorm.repository';
import { IUserRatingSearchParams, IUserRating, IUserRatingService, IUserRatingRepository } from '../../types';
import { SORTING_ORDER, DB_TYPES } from '../../helpers/constants';

const { DB } = require('../../config');

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
      const searchParams = {
        limit: 10,
        sortBy: {
          createdAt: DB === DB_TYPES.POSTGRES ? SORTING_ORDER.DESC.toUpperCase() : SORTING_ORDER.DESC,
        },
      };
      return await this.repository.get(searchParams);
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

  public async update(__id: string, userRating: IUserRating) {
    try {
      return await this.repository.update(__id, userRating);
    } catch (error) {
      throw new Error();
    }
  }
}

const repository = new UserRatingTypeormRepository();
const userRatingsService = new UserRatingService(repository);

export default userRatingsService;
