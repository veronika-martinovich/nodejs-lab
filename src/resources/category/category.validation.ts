import { isBoolean } from '../../helpers/validation';
import { ICategoryQueryParams } from '../../types';
import { InvalidRequestError } from '../../helpers/errors';

export const validateCategoryQueryParams = (params: ICategoryQueryParams) => {
  if (params.includeProducts && !isBoolean(params.includeProducts)) {
    throw new InvalidRequestError('Invalid include products data');
  }
  if (params.includeTop3Products && !isBoolean(params.includeTop3Products)) {
    throw new InvalidRequestError('Invalid include top 3 products data');
  }
};
