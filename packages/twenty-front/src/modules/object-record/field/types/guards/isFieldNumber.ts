import { FieldDefinition } from '../FieldDefinition';
import { FieldMetadata, FieldNumberMetadata } from '../FieldMetadata';

export const isFieldNumber = (
  field: Pick<FieldDefinition<FieldMetadata>, 'type'>,
): field is FieldDefinition<FieldNumberMetadata> => field.type === 'NUMBER';
