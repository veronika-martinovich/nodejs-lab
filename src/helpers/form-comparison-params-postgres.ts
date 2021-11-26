import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { SELECTION_PARAMS } from './constants';

export const formComparisonParamsPostgres = ({
  comparisonValue,
  minValue,
  maxValue,
}: {
  comparisonValue: string;
  minValue?: number;
  maxValue?: number;
}) => {
  switch (comparisonValue) {
    case SELECTION_PARAMS.LESS_OR_EQUAL:
      return LessThanOrEqual(maxValue);

    case SELECTION_PARAMS.MORE_OR_EQUAL:
      return MoreThanOrEqual(minValue);

    case SELECTION_PARAMS.LESS_AND_MORE:
      return Between(minValue, maxValue);
  }
};
