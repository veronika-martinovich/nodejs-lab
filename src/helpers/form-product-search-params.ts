import { IProductQueryParams, IProductWhereParams, IProductOrderParams, IProductSearchParams } from '../types';
import { SELECTION_PARAMS, DB_TYPES } from './constants';
import { formComparisonParamsPostgres } from './form-comparison-params-postgres';
import { formComparisonParamsMongo } from './form-comparison-params-mongo';

const { DB } = require('../config');

const formComparisonParams = ({
  comparisonValue,
  minValue,
  maxValue,
}: {
  comparisonValue: string;
  minValue?: number;
  maxValue?: number;
}) => {
  if (DB === DB_TYPES.POSTGRES) {
    formComparisonParamsPostgres({
      comparisonValue,
      minValue,
      maxValue,
    });
  } else {
    formComparisonParamsMongo({
      comparisonValue,
      minValue,
      maxValue,
    });
  }
};

export const formProductSearchParams = (queryParams: IProductQueryParams) => {
  const where: IProductWhereParams = {};
  const order: IProductOrderParams = {};

  if (queryParams.displayName) {
    where.displayName = queryParams.displayName;
  }

  if (queryParams.createdAt) {
    where.createdAt = queryParams.createdAt;
  }

  if (queryParams?.minRating && where.totalRating) {
    where.totalRating = formComparisonParams({
      comparisonValue: SELECTION_PARAMS.MORE_OR_EQUAL,
      minValue: Number(queryParams.minRating),
    });
  }

  if (queryParams.price) {
    where.price = formComparisonParams({
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
