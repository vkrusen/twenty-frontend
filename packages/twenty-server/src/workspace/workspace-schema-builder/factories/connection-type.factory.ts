import { Injectable, Logger } from '@nestjs/common';

import { GraphQLOutputType } from 'graphql';

import { WorkspaceBuildSchemaOptions } from 'src/workspace/workspace-schema-builder/interfaces/workspace-build-schema-optionts.interface';
import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

import {
  TypeMapperService,
  TypeOptions,
} from 'src/workspace/workspace-schema-builder/services/type-mapper.service';
import { TypeDefinitionsStorage } from 'src/workspace/workspace-schema-builder/storages/type-definitions.storage';
import { PageInfoType } from 'src/workspace/workspace-schema-builder/graphql-types/object';

import { ConnectionTypeDefinitionKind } from './connection-type-definition.factory';
import { ObjectTypeDefinitionKind } from './object-type-definition.factory';

@Injectable()
export class ConnectionTypeFactory {
  private readonly logger = new Logger(ConnectionTypeFactory.name);

  constructor(
    private readonly typeMapperService: TypeMapperService,
    private readonly typeDefinitionsStorage: TypeDefinitionsStorage,
  ) {}

  public create(
    objectMetadata: ObjectMetadataInterface,
    kind: ConnectionTypeDefinitionKind,
    buildOtions: WorkspaceBuildSchemaOptions,
    typeOptions: TypeOptions,
  ): GraphQLOutputType {
    if (kind === ConnectionTypeDefinitionKind.PageInfo) {
      return this.typeMapperService.mapToGqlType(PageInfoType, typeOptions);
    }

    const edgeType = this.typeDefinitionsStorage.getObjectTypeByKey(
      objectMetadata.id,
      kind as unknown as ObjectTypeDefinitionKind,
    );

    if (!edgeType) {
      this.logger.error(
        `Edge type for ${objectMetadata.nameSingular} was not found. Please, check if you have defined it.`,
        {
          objectMetadata,
          buildOtions,
        },
      );

      throw new Error(
        `Edge type for ${objectMetadata.nameSingular} was not found. Please, check if you have defined it.`,
      );
    }

    return this.typeMapperService.mapToGqlType(edgeType, typeOptions);
  }
}
