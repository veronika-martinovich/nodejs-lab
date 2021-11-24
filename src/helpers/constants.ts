const { DB } = require('../config');

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
  ASC: DB === DB_TYPES.MONGO ? 'asc' : 'ASC',
  DESC: DB === DB_TYPES.MONGO ? 'desc' : 'DESC',
};

export const PRODUCT_FIELDS = {
  id: '__id',
  displayName: 'displayName',
  totalRating: 'totalRating',
};
