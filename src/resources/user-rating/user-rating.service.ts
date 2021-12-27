import { UserRatingTypeormRepository } from './user-rating.typeorm.repository';
import { IUserRatingSearchParams, IUserRating, IUserRatingService, IUserRatingRepository } from '../../types';

class UserRatingService implements IUserRatingService {
  repository: IUserRatingRepository;

  constructor(repository: IUserRatingRepository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  };

  getAvgByProduct = async (prodId: string) => {
    try {
      return await this.repository.getAvgByProduct(prodId);
    } catch (error) {
      throw new Error();
    }
  };

  get = async (params: IUserRatingSearchParams) => {
    try {
      return await this.repository.get(params);
    } catch (error) {
      throw new Error();
    }
  };

  save = async (userRating: IUserRating) => {
    try {
      return await this.repository.save(userRating);
    } catch (error) {
      throw new Error();
    }
  };

  update = async (__id: string, userRating: IUserRating) => {
    try {
      return await this.repository.update(__id, userRating);
    } catch (error) {
      throw new Error();
    }
  };
}

const repository = new UserRatingTypeormRepository();
const userRatingsService = new UserRatingService(repository);

export default userRatingsService;
