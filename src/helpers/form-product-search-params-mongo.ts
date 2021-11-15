import { IProductQueryParams, IProductWhereParams, IProductOrderParams, IProductSearchParams } from '../types';
import { SELECTION_PARAMS } from './constants';
import { formComparisonParamsMongo } from './form-comparison-params-mongo';

export const formProductSearchParamsMongo = (queryParams: IProductQueryParams) => {
  const where: IProductWhereParams = {};
  const order: IProductOrderParams = {};

  if (queryParams.displayName) {
    where.displayName = queryParams.displayName;
  }

  if (queryParams.createdAt) {
    where.createdAt = queryParams.createdAt;
  }

  if (queryParams?.minRating && where.totalRating) {
    where.totalRating = formComparisonParamsMongo({
      comparisonValue: SELECTION_PARAMS.MORE_OR_EQUAL,
      minValue: Number(queryParams.minRating),
    });
  }

  if (queryParams.price) {
    where.price = formComparisonParamsMongo({
      comparisonValue: SELECTION_PARAMS.LESS_AND_MORE,
      minValue: Number(queryParams.price.slice(0, queryParams.price.indexOf(':'))),
      maxValue: Number(queryParams.price.slice(queryParams.price.indexOf(':') + 1)),
    });
  }

  if (queryParams.sortBy) {
    const sortField = queryParams.sortBy.slice(0, queryParams.sortBy.indexOf(':'));
    const sortDirection = queryParams.sortBy.slice(queryParams.sortBy.indexOf(':') + 1);
    order[sortField] = sortDirection;
  }

  const searchParams: IProductSearchParams = {
    where,
    order,
  };

  return searchParams;
};
