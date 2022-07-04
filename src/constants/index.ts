import { IBooleanValue } from '../resources/common/common.types';

export const DB_TYPES = {
  POSTGRES: 'postgres',
  MONGO: 'mongo',
};

export const SELECTION_PARAMS = {
  LESS_OR_EQUAL: 'lessOrEqual',
  MORE_OR_EQUAL: 'moreOrEqual',
  LESS_AND_MORE: 'lessAndMore',
};

export const SORTING_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const PRODUCT_FIELDS = {
  id: '__id',
  displayName: 'displayName',
  totalRating: 'totalRating',
};

export const BOOLEAN_MAP: IBooleanValue = {
  true: true,
  false: false,
};

export const ROLES = {
  ADMIN: 'admin',
  BUYER: 'buyer',
};

export const LATEST_RATINGS_AMOUNT = 10;
