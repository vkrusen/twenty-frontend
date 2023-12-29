import { BadRequestException } from '@nestjs/common';

import { FieldMetadataTargetColumnMap } from 'src/metadata/field-metadata/interfaces/field-metadata-target-column-map.interface';

import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';
import { createCustomColumnName } from 'src/metadata/utils/create-custom-column-name.util';

/**
 * Generate a target column map for a given type, this is used to map the field to the correct column(s) in the database.
 * This is used to support fields that map to multiple columns in the database.
 *
 * @param type string
 * @returns FieldMetadataTargetColumnMap
 */
export function generateTargetColumnMap(
  type: FieldMetadataType,
  isCustomField: boolean,
  fieldName: string,
): FieldMetadataTargetColumnMap {
  const columnName = isCustomField
    ? createCustomColumnName(fieldName)
    : fieldName;

  switch (type) {
    case FieldMetadataType.UUID:
    case FieldMetadataType.TEXT:
    case FieldMetadataType.PHONE:
    case FieldMetadataType.EMAIL:
    case FieldMetadataType.NUMBER:
    case FieldMetadataType.NUMERIC:
    case FieldMetadataType.PROBABILITY:
    case FieldMetadataType.BOOLEAN:
    case FieldMetadataType.DATE_TIME:
    case FieldMetadataType.RATING:
    case FieldMetadataType.SELECT:
    case FieldMetadataType.MULTI_SELECT:
      return {
        value: columnName,
      };
    case FieldMetadataType.LINK:
      return {
        label: `${columnName}Label`,
        url: `${columnName}Url`,
      };
    case FieldMetadataType.CURRENCY:
      return {
        amountMicros: `${columnName}AmountMicros`,
        currencyCode: `${columnName}CurrencyCode`,
      };
    case FieldMetadataType.FULL_NAME:
      return {
        firstName: `${columnName}FirstName`,
        lastName: `${columnName}LastName`,
      };
    case FieldMetadataType.RELATION:
      return {};
    default:
      throw new BadRequestException(`Unknown type ${type}`);
  }
}
