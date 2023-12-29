import { ObjectMetadataItemsQuery } from '~/generated-metadata/graphql';

import { ObjectMetadataItem } from '../types/ObjectMetadataItem';

export const mapPaginatedObjectMetadataItemsToObjectMetadataItems = ({
  pagedObjectMetadataItems,
}: {
  pagedObjectMetadataItems: ObjectMetadataItemsQuery | undefined;
}) => {
  const formattedObjects: ObjectMetadataItem[] =
    pagedObjectMetadataItems?.objects.edges.map((object) => ({
      ...object.node,
      fields: object.node.fields.edges.map((field) => field.node),
    })) ?? [];

  return formattedObjects;
};
