import { getRepository } from 'typeorm';
import { UserRatings } from './user-ratings.typeorm.model';
import { IUserRatingsRepository, IUserRating, IUserRatingSearchParams } from '../../types';
import { NotFoundError } from '../../helpers/errors';

export class UserRatingsTypeormRepository implements IUserRatingsRepository {
  getAll = async () => {
    const userRatingsRepository = getRepository(UserRatings);
    const usersRatings = await userRatingsRepository.find();
    if (!usersRatings) {
      throw new NotFoundError('User ratings not found');
    }
    return usersRatings;
  };

  getAvgByProduct = async (prodId: string) => {
    const userRatingsRepository = getRepository(UserRatings);
    const avg = await userRatingsRepository
      .createQueryBuilder('userRatings')
      .select('AVG(userRatings.rating)')
      .where('userRatings.productId = :prodId', { prodId })
      .execute();
    if (!avg) {
      throw new NotFoundError('User ratings not found');
    }
    return avg[0].avg;
  };

  get = async (params: IUserRatingSearchParams) => {
    const userRatingsRepository = getRepository(UserRatings);
    const userRatings = await userRatingsRepository.find(params);
    if (!userRatings) {
      throw new NotFoundError('User ratings not found');
    }
    return userRatings;
  };

  save = async (userRating: IUserRating) => {
    const userRatingsRepository = getRepository(UserRatings);
    const newUserRating = userRatingsRepository.create({
      userId: userRating.userId,
      productId: userRating.productId,
      rating: userRating.rating,
      comment: userRating.comment,
    });

    const savedUserRating = await userRatingsRepository.save(newUserRating);

    if (!savedUserRating) {
      throw new NotFoundError('User rating was not created');
    }
    return savedUserRating;
  };

  update = async (__id: string, userRating: IUserRating) => {
    const userRatingsRepository = getRepository(UserRatings);
    await userRatingsRepository.update({ __id }, { ...userRating });
    const updatedUser = await userRatingsRepository.find({ where: { __id } });

    if (!updatedUser) {
      throw new NotFoundError('User rating was not updated');
    }
    return updatedUser[0];
  };
}
