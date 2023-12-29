import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/metadata/relation-metadata/relation-metadata.entity';

const DEFAULT_DEPTH_VALUE = 2;

export const mapFieldMetadataToGraphqlQuery = (
  objectMetadataItems,
  field,
  maxDepthForRelations = DEFAULT_DEPTH_VALUE,
): string | undefined => {
  if (maxDepthForRelations <= 0) {
    return '';
  }

  const fieldType = field.type;

  const fieldIsSimpleValue = [
    FieldMetadataType.UUID,
    FieldMetadataType.TEXT,
    FieldMetadataType.PHONE,
    FieldMetadataType.DATE_TIME,
    FieldMetadataType.EMAIL,
    FieldMetadataType.NUMBER,
    FieldMetadataType.BOOLEAN,
  ].includes(fieldType);

  if (fieldIsSimpleValue) {
    return field.name;
  } else if (
    fieldType === FieldMetadataType.RELATION &&
    field.toRelationMetadata?.relationType === RelationMetadataType.ONE_TO_MANY
  ) {
    const relationMetadataItem = objectMetadataItems.find(
      (objectMetadataItem) =>
        objectMetadataItem.id ===
        (field.toRelationMetadata as any)?.fromObjectMetadataId,
    );

    return `${field.name}
    {
      id
      ${(relationMetadataItem?.fields ?? [])
        .filter((field) => field.type !== FieldMetadataType.RELATION)
        .map((field) =>
          mapFieldMetadataToGraphqlQuery(
            objectMetadataItems,
            field,
            maxDepthForRelations - 1,
          ),
        )
        .join('\n')}
    }`;
  } else if (
    fieldType === FieldMetadataType.RELATION &&
    field.fromRelationMetadata?.relationType ===
      RelationMetadataType.ONE_TO_MANY
  ) {
    const relationMetadataItem = objectMetadataItems.find(
      (objectMetadataItem) =>
        objectMetadataItem.id ===
        (field.fromRelationMetadata as any)?.toObjectMetadataId,
    );

    return `${field.name}
      {
        edges {
          node {
            id
            ${(relationMetadataItem?.fields ?? [])
              .filter((field) => field.type !== FieldMetadataType.RELATION)
              .map((field) =>
                mapFieldMetadataToGraphqlQuery(
                  objectMetadataItems,
                  field,
                  maxDepthForRelations - 1,
                ),
              )
              .join('\n')}
          }
        }
      }`;
  } else if (fieldType === FieldMetadataType.LINK) {
    return `
      ${field.name}
      {
        label
        url
      }
    `;
  } else if (fieldType === FieldMetadataType.CURRENCY) {
    return `
      ${field.name}
      {
        amountMicros
        currencyCode
      }
    `;
  } else if (fieldType === FieldMetadataType.FULL_NAME) {
    return `
      ${field.name}
      {
        firstName
        lastName
      }
    `;
  }
};
