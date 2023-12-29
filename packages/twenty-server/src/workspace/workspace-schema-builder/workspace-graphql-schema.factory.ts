import { Injectable, Logger } from '@nestjs/common';

import { GraphQLSchema } from 'graphql';

import { WorkspaceResolverBuilderMethods } from 'src/workspace/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';
import { ObjectMetadataInterface } from 'src/metadata/field-metadata/interfaces/object-metadata.interface';

import { TypeDefinitionsGenerator } from './type-definitions.generator';

import { WorkspaceBuildSchemaOptions } from './interfaces/workspace-build-schema-optionts.interface';
import { QueryTypeFactory } from './factories/query-type.factory';
import { MutationTypeFactory } from './factories/mutation-type.factory';
import { OrphanedTypesFactory } from './factories/orphaned-types.factory';

@Injectable()
export class WorkspaceGraphQLSchemaFactory {
  private readonly logger = new Logger(WorkspaceGraphQLSchemaFactory.name);

  constructor(
    private readonly typeDefinitionsGenerator: TypeDefinitionsGenerator,
    private readonly queryTypeFactory: QueryTypeFactory,
    private readonly mutationTypeFactory: MutationTypeFactory,
    private readonly orphanedTypesFactory: OrphanedTypesFactory,
  ) {}

  async create(
    objectMetadataCollection: ObjectMetadataInterface[],
    workspaceResolverBuilderMethods: WorkspaceResolverBuilderMethods,
    options: WorkspaceBuildSchemaOptions = {},
  ): Promise<GraphQLSchema> {
    // Generate type definitions
    this.typeDefinitionsGenerator.generate(objectMetadataCollection, options);

    // Generate schema
    const schema = new GraphQLSchema({
      query: this.queryTypeFactory.create(
        objectMetadataCollection,
        [...workspaceResolverBuilderMethods.queries],
        options,
      ),
      mutation: this.mutationTypeFactory.create(
        objectMetadataCollection,
        [...workspaceResolverBuilderMethods.mutations],
        options,
      ),
      types: this.orphanedTypesFactory.create(),
    });

    return schema;
  }
}
