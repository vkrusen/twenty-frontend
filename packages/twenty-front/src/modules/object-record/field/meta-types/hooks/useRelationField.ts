import { useContext } from 'react';
import { useRecoilState } from 'recoil';

import { FieldContext } from '../../contexts/FieldContext';
import { useFieldInitialValue } from '../../hooks/useFieldInitialValue';
import { entityFieldsFamilySelector } from '../../states/selectors/entityFieldsFamilySelector';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldRelation } from '../../types/guards/isFieldRelation';

// TODO: we will be able to type more precisely when we will have custom field and custom entities support
export const useRelationField = () => {
  const { entityId, fieldDefinition } = useContext(FieldContext);

  assertFieldMetadata('RELATION', isFieldRelation, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<any | null>(
    entityFieldsFamilySelector({
      entityId: entityId,
      fieldName: fieldName,
    }),
  );

  const fieldInitialValue = useFieldInitialValue();

  const initialSearchValue = fieldInitialValue?.isEmpty
    ? null
    : fieldInitialValue?.value;

  const initialValue = fieldInitialValue?.isEmpty ? null : fieldValue;

  return {
    fieldDefinition,
    fieldValue,
    initialValue,
    initialSearchValue,
    setFieldValue,
  };
};
