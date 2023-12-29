import { ViewFilterOperand } from '@/views/types/ViewFilterOperand';

import { FilterType } from '../types/FilterType';

export const getOperandsForFilterType = (
  filterType: FilterType | null | undefined,
): ViewFilterOperand[] => {
  switch (filterType) {
    case 'TEXT':
    case 'EMAIL':
    case 'FULL_NAME':
    case 'LINK':
      return [ViewFilterOperand.Contains, ViewFilterOperand.DoesNotContain];
    case 'CURRENCY':
    case 'NUMBER':
    case 'DATE_TIME':
      return [ViewFilterOperand.GreaterThan, ViewFilterOperand.LessThan];
    case 'RELATION':
      return [ViewFilterOperand.Is, ViewFilterOperand.IsNot];
    default:
      return [];
  }
};
