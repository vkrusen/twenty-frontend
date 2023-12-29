import { FieldMetadata } from '@/object-record/field/types/FieldMetadata';
import { isFieldRelation } from '@/object-record/field/types/guards/isFieldRelation';
import { ColumnDefinition } from '@/object-record/record-table/types/ColumnDefinition';

export const filterAvailableTableColumns = (
  columnDefinition: ColumnDefinition<FieldMetadata>,
): boolean => {
  if (
    isFieldRelation(columnDefinition) &&
    columnDefinition.metadata?.relationType !== 'TO_ONE_OBJECT'
  ) {
    return false;
  }

  if (columnDefinition.type === 'UUID') {
    return false;
  }

  if (
    isFieldRelation(columnDefinition) &&
    columnDefinition.metadata?.fieldName === 'pipelineStep'
  ) {
    return false;
  }

  return true;
};
