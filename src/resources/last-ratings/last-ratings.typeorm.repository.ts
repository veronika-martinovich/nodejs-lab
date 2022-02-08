import { getRepository } from 'typeorm';
import { LastRatings } from './last-ratings.typeorm.model';
import { ILastRatingsRepository, IUserRatingReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';
import { LATEST_RATINGS_AMOUNT } from '../../helpers/constants';

export class LastRatingsTypeormRepository implements ILastRatingsRepository {
  public async getAll() {
    const lastRatingsRepository = getRepository(LastRatings);
    const lastRatings = await lastRatingsRepository.find();
    if (!lastRatings) {
      throw new NotFoundError('Last ratings not found');
    }
    return lastRatings;
  }

  public async cleanUpOld() {
    const lastRatingsRepository = getRepository(LastRatings);
    const lastRatingsToDelete = await lastRatingsRepository.find({ skip: LATEST_RATINGS_AMOUNT });
    const deletedLastRatings = await lastRatingsRepository.remove(lastRatingsToDelete);

    if (!deletedLastRatings) {
      throw new NotFoundError('Last ratings not found');
    }
    return Number(deletedLastRatings);
  }

  public async save(lastRating: IUserRatingReq) {
    const lastRatingsRepository = getRepository(LastRatings);
    const newLastRating = lastRatingsRepository.create({
      userId: lastRating.userId,
      productId: lastRating.productId,
      rating: lastRating.rating,
      comment: lastRating.comment,
    } as any);

    const savedLastRating = await lastRatingsRepository.save(newLastRating);

    if (!savedLastRating) {
      throw new NotFoundError('Last rating was not created');
    }
    return savedLastRating[0];
  }
}
