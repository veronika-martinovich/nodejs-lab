import { IProductQueryParams, IProductWhereParams, IProductOrderParams, IProductSearchParams } from '../types';
import { SELECTION_PARAMS } from './constants';
import { formComparisonParamsPostgres } from './form-comparison-params-postgres';

export const formProductSearchParamsPostgres = (queryParams: IProductQueryParams) => {
  const where: IProductWhereParams = {};
  const order: IProductOrderParams = {};

  if (queryParams.displayName) {
    where.displayName = queryParams.displayName;
  }

  if (queryParams.createdAt) {
    where.createdAt = queryParams.createdAt;
  }

  if (queryParams?.minRating && where.totalRating) {
    where.totalRating = formComparisonParamsPostgres({
      comparisonValue: SELECTION_PARAMS.MORE_OR_EQUAL,
      minValue: Number(queryParams.minRating),
    });
  }

  if (queryParams.price) {
    where.price = formComparisonParamsPostgres({
      comparisonValue: SELECTION_PARAMS.LESS_AND_MORE,
      minValue: Number(queryParams.price.slice(0, queryParams.price.indexOf(':'))),
      maxValue: Number(queryParams.price.slice(queryParams.price.indexOf(':') + 1)),
    });
  }

  if (queryParams.sortBy) {
    const sortField = queryParams.sortBy.slice(0, queryParams.sortBy.indexOf(':'));
    const sortDirection = queryParams.sortBy.slice(queryParams.sortBy.indexOf(':') + 1).toUpperCase();
    order[sortField] = sortDirection;
  }

  const newParams: IProductSearchParams = {
    where,
    order,
  };

  return newParams;
};
