import { LastRatingsTypegooseRepository } from './last-ratings.typegoose.repository';
import { LastRatingsTypeormRepository } from './last-ratings.typeorm.repository';
import { ILastRatingsService, ILastRatingsRepository } from './last-ratings.types';
import { IUserRatingReq } from '../user-rating/user-rating.types';
import { DB_TYPES } from '../../helpers/constants';

class LastRatingsService implements ILastRatingsService {
  repository: ILastRatingsRepository;

  constructor(repository: ILastRatingsRepository) {
    this.repository = repository;
  }

  public async getAll() {
    return this.repository.getAll();
  }

  public async cleanUpOld() {
    return this.repository.cleanUpOld();
  }

  public async save(lastRating: IUserRatingReq) {
    return this.repository.save(lastRating);
  }
}

const repository =
  process.env.DB === DB_TYPES.POSTGRES ? new LastRatingsTypeormRepository() : new LastRatingsTypegooseRepository();
const lastRatingsService = new LastRatingsService(repository);

export default lastRatingsService;
