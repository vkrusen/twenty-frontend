import { Injectable } from '@nestjs/common';

import { capitalize } from 'src/utils/capitalize';
import { mapFieldMetadataToGraphqlQuery } from 'src/core/api-rest/api-rest-query-builder/utils/map-field-metadata-to-graphql-query.utils';

@Injectable()
export class FindOneQueryFactory {
  create(objectMetadata, depth?: number): string {
    const objectNameSingular = objectMetadata.objectMetadataItem.nameSingular;

    return `
      query FindOne${capitalize(objectNameSingular)}(
        $filter: ${capitalize(objectNameSingular)}FilterInput!,
        ) {
        ${objectNameSingular}(filter: $filter) {
          id
          ${objectMetadata.objectMetadataItem.fields
            .map((field) =>
              mapFieldMetadataToGraphqlQuery(
                objectMetadata.objectMetadataItems,
                field,
                depth,
              ),
            )
            .join('\n')}
        }
      }
    `;
  }
}
