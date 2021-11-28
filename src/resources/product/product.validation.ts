import { isString, isNumber, isDate, isSortOrder } from '../../helpers/validation';
import { IProductQueryParams } from '../../types';
import { InvalidRequestError } from '../../helpers/errors';

export const validateProductQueryParams = (params: IProductQueryParams) => {
  if (params.displayName && !isString(params.displayName)) {
    throw new InvalidRequestError('Invalid display name data');
  }
  if (params.minRating && !isNumber(params.minRating)) {
    throw new InvalidRequestError('Invalid minimal rating data');
  }
  if (params.createdAt && !isString(params.createdAt) && !isDate(params.createdAt)) {
    throw new InvalidRequestError('Invalid created at data');
  }
  if (params.limit && !isNumber(params.limit)) {
    throw new InvalidRequestError('Invalid limit data');
  }
  if (params.offset && !isNumber(params.offset)) {
    throw new InvalidRequestError('Invalid offset data');
  }
  if (params.price) {
    const priceParts = params.price.split(':');
    priceParts.forEach((item) => {
      if (!isNumber(item)) {
        throw new InvalidRequestError('Invalid price data');
      }
    });
  }
  if (params.sortBy) {
    const sortParts = params.sortBy.split(':');

    if (!isString(sortParts[0]) || !isSortOrder(sortParts[1])) {
      throw new InvalidRequestError('Invalid sorting data');
    }
  }
};
