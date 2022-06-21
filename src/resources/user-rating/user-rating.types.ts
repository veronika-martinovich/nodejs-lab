import { UserRating } from './user-rating.typeorm.model';

export interface IUserRatingReq {
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
}

export interface IUserRating {
  _id?: string;
  userId?: string;
  productId?: string;
  rating?: number;
  comment?: string;
  createdAt?: Date;
}

export interface IUserRatingSearchParams {
  where?: any;
  limit?: number;
  sortBy?: any;
}

export interface IUserRatingRepository {
  getAll(): Promise<Array<IUserRating | UserRating>>;
  get(params: IUserRatingSearchParams): Promise<Array<IUserRating | UserRating>>;
  getAvgByProduct(prodId: string): Promise<number>;
  save(userRating: IUserRating): Promise<IUserRating | UserRating | null>;
  update(id: string, userRating: IUserRating): Promise<IUserRating | UserRating | null>;
}

export interface IUserRatingService {
  repository: IUserRatingRepository;
  getAll(): Promise<Array<IUserRating>>;
  get(params: IUserRatingSearchParams): Promise<Array<IUserRating>>;
  getAvgByProduct(prodId: string): Promise<number>;
  getLastRatings(params: IUserRatingSearchParams): Promise<Array<IUserRating>>;
  save(userRating: IUserRating): Promise<IUserRating | null>;
  update(id: string, userRating: IUserRating): Promise<IUserRating | null>;
}
