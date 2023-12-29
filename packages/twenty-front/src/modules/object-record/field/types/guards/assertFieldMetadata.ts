import { FieldDefinition } from '../FieldDefinition';
import {
  FieldBooleanMetadata,
  FieldCurrencyMetadata,
  FieldDateTimeMetadata,
  FieldEmailMetadata,
  FieldFullNameMetadata,
  FieldLinkMetadata,
  FieldMetadata,
  FieldNumberMetadata,
  FieldPhoneMetadata,
  FieldRatingMetadata,
  FieldRelationMetadata,
  FieldSelectMetadata,
  FieldTextMetadata,
  FieldUuidMetadata,
} from '../FieldMetadata';
import { FieldType } from '../FieldType';

type AssertFieldMetadataFunction = <
  E extends FieldType,
  T extends E extends 'BOOLEAN'
    ? FieldBooleanMetadata
    : E extends 'CURRENCY'
      ? FieldCurrencyMetadata
      : E extends 'FULL_NAME'
        ? FieldFullNameMetadata
        : E extends 'DATE_TIME'
          ? FieldDateTimeMetadata
          : E extends 'EMAIL'
            ? FieldEmailMetadata
            : E extends 'SELECT'
              ? FieldSelectMetadata
              : E extends 'RATING'
                ? FieldRatingMetadata
                : E extends 'LINK'
                  ? FieldLinkMetadata
                  : E extends 'NUMBER'
                    ? FieldNumberMetadata
                    : E extends 'PHONE'
                      ? FieldPhoneMetadata
                      : E extends 'PROBABILITY'
                        ? FieldRatingMetadata
                        : E extends 'RELATION'
                          ? FieldRelationMetadata
                          : E extends 'TEXT'
                            ? FieldTextMetadata
                            : E extends 'UUID'
                              ? FieldUuidMetadata
                              : never,
>(
  fieldType: E,
  fieldTypeGuard: (
    a: FieldDefinition<FieldMetadata>,
  ) => a is FieldDefinition<T>,
  fieldDefinition: FieldDefinition<FieldMetadata>,
) => asserts fieldDefinition is FieldDefinition<T>;

export const assertFieldMetadata: AssertFieldMetadataFunction = (
  fieldType,
  fieldTypeGuard,
  fieldDefinition,
) => {
  const fieldDefinitionType = fieldDefinition.type;

  if (!fieldTypeGuard(fieldDefinition) || fieldDefinitionType !== fieldType) {
    throw new Error(
      `Trying to use a "${fieldDefinitionType}" field as a "${fieldType}" field. Verify that the field is defined as a type "${fieldDefinitionType}" field in assertFieldMetadata.ts.`,
    );
  } else {
    return;
  }
};
