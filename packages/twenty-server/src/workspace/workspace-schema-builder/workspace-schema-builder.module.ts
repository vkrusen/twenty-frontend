import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { ObjectMetadataModule } from 'src/metadata/object-metadata/object-metadata.module';

import { TypeDefinitionsGenerator } from './type-definitions.generator';
import { WorkspaceGraphQLSchemaFactory } from './workspace-graphql-schema.factory';

import { workspaceSchemaBuilderFactories } from './factories/factories';
import { TypeDefinitionsStorage } from './storages/type-definitions.storage';
import { TypeMapperService } from './services/type-mapper.service';

@Module({
  imports: [ObjectMetadataModule],
  providers: [
    ...workspaceSchemaBuilderFactories,
    TypeDefinitionsGenerator,
    TypeDefinitionsStorage,
    TypeMapperService,
    WorkspaceGraphQLSchemaFactory,
    JwtAuthGuard,
  ],
  exports: [WorkspaceGraphQLSchemaFactory],
})
export class WorkspaceSchemaBuilderModule {}
