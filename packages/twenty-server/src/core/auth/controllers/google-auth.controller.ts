import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Response } from 'express';
import { Repository } from 'typeorm';

import { GoogleRequest } from 'src/core/auth/strategies/google.auth.strategy';
import { TokenService } from 'src/core/auth/services/token.service';
import { GoogleProviderEnabledGuard } from 'src/core/auth/guards/google-provider-enabled.guard';
import { GoogleOauthGuard } from 'src/core/auth/guards/google-oauth.guard';
import { User } from 'src/core/user/user.entity';
import { Workspace } from 'src/core/workspace/workspace.entity';
import { AuthService } from 'src/core/auth/services/auth.service';
import { TypeORMService } from 'src/database/typeorm/typeorm.service';
import { EnvironmentService } from 'src/integrations/environment/environment.service';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly environmentService: EnvironmentService,
    private readonly typeORMService: TypeORMService,
    private readonly authService: AuthService,
    @InjectRepository(Workspace, 'core')
    @InjectRepository(User, 'core')
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(GoogleProviderEnabledGuard, GoogleOauthGuard)
  async googleAuth() {
    // As this method is protected by Google Auth guard, it will trigger Google SSO flow
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleProviderEnabledGuard, GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: GoogleRequest, @Res() res: Response) {
    const { firstName, lastName, email, picture, workspaceInviteHash } =
      req.user;

    const mainDataSource = await this.typeORMService.getMainDataSource();

    const existingUser = await mainDataSource
      .getRepository(User)
      .findOneBy({ email: email });

    if (existingUser) {
      const loginToken = await this.tokenService.generateLoginToken(
        existingUser.email,
      );

      return res.redirect(
        this.tokenService.computeRedirectURI(loginToken.token),
      );
    }

    const user = await this.authService.signUp({
      email,
      firstName,
      lastName,
      picture,
      workspaceInviteHash,
    });

    const loginToken = await this.tokenService.generateLoginToken(user.email);

    return res.redirect(this.tokenService.computeRedirectURI(loginToken.token));
  }
}
