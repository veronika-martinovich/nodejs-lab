import { isString, isNumber, isDate, isSortOrder, isBoolean, isEmptyObject } from './validation';
import { IValidationParams } from '../types';
import { InvalidRequestError } from './errors';

export const validateParams = (params: IValidationParams) => {
  const FIELD_NAMES = {
    DISPLAY_NAME: 'display name',
    MIN_RATING: 'minimal rating',
    CREATED_AT: 'creation date',
    LIMIT: 'limit',
    OFFSET: 'offset',
    PRICE: 'prIce',
    SORT_FIELD: 'sort field',
    SORT_DIRECTION: 'sort direction',
    CATEGORY_ID: 'category id',
    INCLUDE_PRODUCTS: 'include products',
    INCLUDE_TOP_3_PRODUCTS: 'include top 3 products',
  };

  const errorFields = [];

  if (params.displayName && !isString(params.displayName)) {
    errorFields.push(FIELD_NAMES.DISPLAY_NAME);
  }
  if (params.minRating && !isNumber(params.minRating)) {
    errorFields.push(FIELD_NAMES.MIN_RATING);
  }
  if (params.createdAt && !isDate(params.createdAt)) {
    errorFields.push(FIELD_NAMES.CREATED_AT);
  }
  if (params.limit && !isNumber(params.limit)) {
    errorFields.push(FIELD_NAMES.LIMIT);
  }
  if (params.offset && !isNumber(params.offset)) {
    errorFields.push(FIELD_NAMES.OFFSET);
  }
  if (params.price) {
    const priceParts = params.price.split(':');
    priceParts.forEach((item) => {
      if (!isNumber(item)) {
        errorFields.push(FIELD_NAMES.PRICE);
      }
    });
  }
  if (params.sortBy) {
    const sortParts = params.sortBy.split(':');
    if (!isString(sortParts[0])) {
      errorFields.push(FIELD_NAMES.SORT_FIELD);
    }
    if (!isSortOrder(sortParts[1])) {
      errorFields.push(FIELD_NAMES.SORT_DIRECTION);
    }
  }
  if (params.categoryId && !isString(params.categoryId)) {
    errorFields.push(FIELD_NAMES.CATEGORY_ID);
  }
  if (params.includeProducts && !isBoolean(params.includeProducts)) {
    errorFields.push(FIELD_NAMES.INCLUDE_PRODUCTS);
  }
  if (params.includeTop3Products && !isBoolean(params.includeTop3Products)) {
    errorFields.push(FIELD_NAMES.INCLUDE_TOP_3_PRODUCTS);
  }

  if (errorFields.length) {
    throw new InvalidRequestError(`Invalid data: ${errorFields.join(', ')}.`);
  }
};

export const validateQuery = (queryParams: any, bodyParams: any) => {
  if (!isEmptyObject(queryParams) || !isEmptyObject(bodyParams)) {
    const validationParams: IValidationParams = { ...queryParams, ...bodyParams };
    validateParams(validationParams);
  }
};
