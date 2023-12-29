import {
  Field,
  HideField,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { GraphQLJSON } from 'graphql-type-json';
import {
  Authorize,
  BeforeDeleteOne,
  FilterableField,
  IDField,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

import { FieldMetadataOptions } from 'src/metadata/field-metadata/interfaces/field-metadata-options.interface';
import { FieldMetadataDefaultValue } from 'src/metadata/field-metadata/interfaces/field-metadata-default-value.interface';

import { RelationMetadataDTO } from 'src/metadata/relation-metadata/dtos/relation-metadata.dto';
import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';
import { BeforeDeleteOneField } from 'src/metadata/field-metadata/hooks/before-delete-one-field.hook';
import { IsFieldMetadataDefaultValue } from 'src/metadata/field-metadata/validators/is-field-metadata-default-value.validator';
import { IsFieldMetadataOptions } from 'src/metadata/field-metadata/validators/is-field-metadata-options.validator';

registerEnumType(FieldMetadataType, {
  name: 'FieldMetadataType',
  description: 'Type of the field',
});

@ObjectType('field')
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
@BeforeDeleteOne(BeforeDeleteOneField)
@Relation('toRelationMetadata', () => RelationMetadataDTO, {
  nullable: true,
})
@Relation('fromRelationMetadata', () => RelationMetadataDTO, {
  nullable: true,
})
export class FieldMetadataDTO<
  T extends FieldMetadataType | 'default' = 'default',
> {
  @IsUUID()
  @IsNotEmpty()
  @IDField(() => ID)
  id: string;

  @IsEnum(FieldMetadataType)
  @IsNotEmpty()
  @Field(() => FieldMetadataType)
  type: FieldMetadataType;

  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  label: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  icon?: string;

  @IsBoolean()
  @IsOptional()
  @FilterableField({ nullable: true })
  isCustom?: boolean;

  @IsBoolean()
  @IsOptional()
  @FilterableField({ nullable: true })
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @FilterableField({ nullable: true })
  isSystem?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isNullable?: boolean;

  @Validate(IsFieldMetadataDefaultValue)
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  defaultValue?: FieldMetadataDefaultValue<T>;

  @Validate(IsFieldMetadataOptions)
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  options?: FieldMetadataOptions<T>;

  @HideField()
  workspaceId: string;

  @IsDateString()
  @Field()
  createdAt: Date;

  @IsDateString()
  @Field()
  updatedAt: Date;
}
