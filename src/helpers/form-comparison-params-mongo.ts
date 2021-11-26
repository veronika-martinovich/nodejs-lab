import { SELECTION_PARAMS } from './constants';

export const formComparisonParamsMongo = ({
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
      return {
        $lte: maxValue,
      };

    case SELECTION_PARAMS.MORE_OR_EQUAL:
      return {
        $gte: minValue,
      };

    case SELECTION_PARAMS.LESS_AND_MORE:
      return {
        $lte: maxValue,
        $gte: minValue,
      };
  }
};
