import { ObjectType, ID, Field, HideField } from '@nestjs/graphql';

import {
  Authorize,
  BeforeDeleteOne,
  CursorConnection,
  FilterableField,
  IDField,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';

import { FieldMetadataDTO } from 'src/metadata/field-metadata/dtos/field-metadata.dto';
import { BeforeDeleteOneObject } from 'src/metadata/object-metadata/hooks/before-delete-one-object.hook';

@ObjectType('object')
@Authorize({
  authorize: (context: any) => ({
    workspaceId: { eq: context?.req?.user?.workspace?.id },
  }),
})
@QueryOptions({
  defaultResultSize: 10,
  disableSort: true,
  maxResultsSize: 1000,
})
@BeforeDeleteOne(BeforeDeleteOneObject)
@CursorConnection('fields', () => FieldMetadataDTO)
export class ObjectMetadataDTO {
  @IDField(() => ID)
  id: string;

  @Field()
  dataSourceId: string;

  @Field()
  nameSingular: string;

  @Field()
  namePlural: string;

  @Field()
  labelSingular: string;

  @Field()
  labelPlural: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  icon: string;

  @FilterableField()
  isCustom: boolean;

  @FilterableField()
  isActive: boolean;

  @FilterableField()
  isSystem: boolean;

  @HideField()
  workspaceId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  labelIdentifierFieldMetadataId: string;

  @Field({ nullable: true })
  imageIdentifierFieldMetadataId: string;
}
