import { isString, isNumber, isDate, isSortOrder, isBoolean } from './validation';
import { IValidationParams } from '../types';
import { InvalidRequestError } from './errors';

export const validateQuery = (params: IValidationParams) => {
  if (params.displayName && !isString(params.displayName)) {
    throw new InvalidRequestError('Invalid display name data');
  }
  if (params.minRating && !isNumber(params.minRating)) {
    throw new InvalidRequestError('Invalid minimal rating data');
  }
  if (params.createdAt && !isDate(params.createdAt)) {
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
  if (params.categoryId && !isString(params.categoryId)) {
    throw new InvalidRequestError('Invalid category Id data');
  }
  if (params.includeProducts && !isBoolean(params.includeProducts)) {
    throw new InvalidRequestError('Invalid include products data');
  }
  if (params.includeTop3Products && !isBoolean(params.includeTop3Products)) {
    throw new InvalidRequestError('Invalid include top 3 products data');
  }
};
