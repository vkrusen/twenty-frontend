import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { assert } from 'src/utils/assert';
import { EnvironmentService } from 'src/integrations/environment/environment.service';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { User } from 'src/core/user/user.entity';
import { TypeORMService } from 'src/database/typeorm/typeorm.service';
import { DataSourceService } from 'src/metadata/data-source/data-source.service';

export type JwtPayload = { sub: string; workspaceId: string; jti?: string };
export type PassportUser = { user?: User; workspace: Workspace };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly typeORMService: TypeORMService,
    private readonly dataSourceService: DataSourceService,
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User, 'core')
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentService.getAccessTokenSecret(),
    });
  }

  async validate(payload: JwtPayload): Promise<PassportUser> {
    const workspace = await this.workspaceRepository.findOneBy({
      id: payload.workspaceId ?? payload.sub,
    });

    if (!workspace) {
      throw new UnauthorizedException();
    }
    if (payload.jti) {
      const dataSourceMetadata =
        await this.dataSourceService.getLastDataSourceMetadataFromWorkspaceIdOrFail(
          workspace.id,
        );

      const workspaceDataSource = await this.typeORMService.connectToDataSource(
        dataSourceMetadata,
      );

      const apiKey = await workspaceDataSource?.query(
        `SELECT * FROM ${dataSourceMetadata.schema}."apiKey" WHERE id = '${payload.jti}'`,
      );

      assert(
        apiKey.length === 1 && !apiKey?.[0].revokedAt,
        'This API Key is revoked',
        ForbiddenException,
      );
    }

    let user;

    if (payload.workspaceId) {
      user = await this.userRepository.findOne({
        where: { id: payload.sub },
        relations: ['defaultWorkspace'],
      });
      if (!user) {
        throw new UnauthorizedException();
      }
    }

    return { user, workspace };
  }
}
