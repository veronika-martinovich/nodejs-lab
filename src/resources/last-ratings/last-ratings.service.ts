import { LastRatingsTypegooseRepository } from './last-ratings.typegoose.repository';
import { LastRatingsTypeormRepository } from './last-ratings.typeorm.repository';
import { ILastRatingsService, ILastRatingsRepository, IUserRatingReq } from '../../types';
import { DB_TYPES } from '../../helpers/constants';

class LastRatingsService implements ILastRatingsService {
  repository: ILastRatingsRepository;

  constructor(repository: ILastRatingsRepository) {
    this.repository = repository;
  }

  public async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error();
    }
  }

  public async cleanUpOld() {
    try {
      return await this.repository.cleanUpOld();
    } catch (error) {
      throw new Error();
    }
  }

  public async save(lastRating: IUserRatingReq) {
    try {
      return await this.repository.save(lastRating);
    } catch (error) {
      throw new Error();
    }
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new LastRatingsTypeormRepository() : new LastRatingsTypegooseRepository();
const lastRatingsService = new LastRatingsService(repository);

export default lastRatingsService;
