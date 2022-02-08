import { LastRatingsModel } from './last-ratings.typegoose.model';
import { ILastRatingsRepository, IUserRatingReq } from '../../types';
import { NotFoundError } from '../../helpers/errors';
import { LATEST_RATINGS_AMOUNT } from '../../helpers/constants';

export class LastRatingsTypegooseRepository implements ILastRatingsRepository {
  public async getAll() {
    const lastRatings = await LastRatingsModel.find({});

    if (!lastRatings) {
      throw new NotFoundError('Last ratings not found');
    }
    return lastRatings;
  }

  public async cleanUpOld() {
    const lastRatingsToDelete = await LastRatingsModel.find({}).skip(LATEST_RATINGS_AMOUNT);
    const lastRatingsToDeleteIds = lastRatingsToDelete.map((item) => item._id);
    const deletedLastRatings = await LastRatingsModel.deleteMany({
      _id: {
        $in: lastRatingsToDeleteIds,
      },
    });

    if (!deletedLastRatings) {
      throw new NotFoundError('Last ratings not found');
    }
    return deletedLastRatings.deletedCount;
  }

  public async save(lastRating: IUserRatingReq) {
    const newLastRating = await LastRatingsModel.create(lastRating);
    const lastRatingToReturn = await LastRatingsModel.findOne({ _id: newLastRating._id }).lean().exec();

    if (!lastRatingToReturn) {
      throw new NotFoundError('Last rating was not created');
    }
    return lastRatingToReturn;
  }
}
