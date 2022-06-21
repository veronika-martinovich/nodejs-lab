import { IUserRatingReq } from '../user-rating/user-rating.types';
import { LastRatings } from './last-ratings.typeorm.model';
import { User } from '../user/user.typeorm.model';

export interface ILastRating {
  _id?: string;
  userId?: string | User;
  productId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

export interface ILastRatingsRepository {
  getAll(): Promise<Array<ILastRating | LastRatings | any>>;
  save(lastRating: IUserRatingReq): Promise<ILastRating | LastRatings | any>;
  cleanUpOld(): Promise<number>;
}

export interface ILastRatingsService {
  repository: ILastRatingsRepository;
  getAll(): Promise<Array<ILastRating | LastRatings>>;
  save(lastRating: IUserRatingReq): Promise<ILastRating | LastRatings>;
  cleanUpOld(): Promise<number>;
}
