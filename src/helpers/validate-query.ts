import { isString, isNumber, isDate, isSortOrder, isBoolean, isEmptyObject } from './validation';
import { IValidationParams } from '../types';

export const validateParams = (params: IValidationParams): Array<string> => {
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

  const invalidFields = [];

  if (params.displayName && !isString(params.displayName)) {
    invalidFields.push(FIELD_NAMES.DISPLAY_NAME);
  }
  if (params.minRating && !isNumber(params.minRating)) {
    invalidFields.push(FIELD_NAMES.MIN_RATING);
  }
  if (params.createdAt && !isDate(params.createdAt)) {
    invalidFields.push(FIELD_NAMES.CREATED_AT);
  }
  if (params.limit && !isNumber(params.limit)) {
    invalidFields.push(FIELD_NAMES.LIMIT);
  }
  if (params.offset && !isNumber(params.offset)) {
    invalidFields.push(FIELD_NAMES.OFFSET);
  }
  if (params.price) {
    const priceParts = params.price.split(':');
    priceParts.forEach((item) => {
      if (!isNumber(item)) {
        invalidFields.push(FIELD_NAMES.PRICE);
      }
    });
  }
  if (params.sortBy) {
    const sortParts = params.sortBy.split(':');
    if (!isString(sortParts[0])) {
      invalidFields.push(FIELD_NAMES.SORT_FIELD);
    }
    if (!isSortOrder(sortParts[1])) {
      invalidFields.push(FIELD_NAMES.SORT_DIRECTION);
    }
  }
  if (params.categoryId && !isString(params.categoryId)) {
    invalidFields.push(FIELD_NAMES.CATEGORY_ID);
  }
  if (params.includeProducts && !isBoolean(params.includeProducts)) {
    invalidFields.push(FIELD_NAMES.INCLUDE_PRODUCTS);
  }
  if (params.includeTop3Products && !isBoolean(params.includeTop3Products)) {
    invalidFields.push(FIELD_NAMES.INCLUDE_TOP_3_PRODUCTS);
  }

  return invalidFields;
};

export const validateQuery = (queryParams: any, bodyParams: any): Array<string> | undefined => {
  if (!isEmptyObject(queryParams) || !isEmptyObject(bodyParams)) {
    const validationParams: IValidationParams = { ...queryParams, ...bodyParams };
    return validateParams(validationParams);
  }
};
