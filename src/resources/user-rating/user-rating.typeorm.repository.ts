import { getRepository } from 'typeorm';
import { UserRating } from './user-rating.typeorm.model';
import { IUserRatingRepository, IUserRating, IUserRatingSearchParams } from './user-rating.types';
import { NotFoundError } from '../../helpers/errors';

export class UserRatingTypeormRepository implements IUserRatingRepository {
  public async getAll() {
    const userRatingsRepository = getRepository(UserRating);
    const usersRatings = await userRatingsRepository.find();
    if (!usersRatings) {
      throw new NotFoundError('User ratings not found');
    }
    return usersRatings;
  }

  public async getAvgByProduct(prodId: string) {
    const userRatingsRepository = getRepository(UserRating);
    const avg = await userRatingsRepository
      .createQueryBuilder('userRatings')
      .select('AVG(userRatings.rating)')
      .where('userRatings.productId = :prodId', { prodId })
      .execute();
    if (!avg) {
      throw new NotFoundError('User ratings not found');
    }
    return Number(avg[0].avg);
  }

  public async get(params: IUserRatingSearchParams) {
    const userRatingsRepository = getRepository(UserRating);
    const searchParams = {
      where: params.where,
      take: params.limit,
      order: params.sortBy,
    };
    const userRatings = await userRatingsRepository.find(searchParams);
    if (!userRatings) {
      throw new NotFoundError('User ratings not found');
    }
    return userRatings;
  }

  public async save(userRating: IUserRating) {
    const userRatingsRepository = getRepository(UserRating);
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
  }

  public async update(id: string, userRating: IUserRating) {
    const userRatingsRepository = getRepository(UserRating);
    await userRatingsRepository.update({ _id: id }, { ...userRating });
    const updatedUser = await userRatingsRepository.find({ where: { _id: id } });

    if (!updatedUser) {
      throw new NotFoundError('User rating was not updated');
    }
    return updatedUser[0];
  }
}
