import { AuthService } from './auth.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthType } from './types/auth.type';
import { UsersService } from '../users/users.service';
import { AuthInput } from './auth.input';
import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Req, Res, UseGuards } from '@nestjs/common';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from './decorators/get-user.decorators';
import { AuthLogin } from './types/auth-login.type';
import { AuthRefresh } from './types/auth-refresh.type';

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthType) 
  async register(@Args('authInput') authInput: AuthInput): Promise<User> {
    return await this.usersService.createUser(authInput)
  }

  @Mutation(() => AuthLogin) 
  async login(@Args('authInput') authInput: AuthInput, @Res(({ passthrough: true })) reply: FastifyReply): Promise<{ accessToken: string, refreshToken: string }> {
    return await this.authService.login(authInput, reply)
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation(() => AuthRefresh)
  async refreshToken(@CurrentUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.refresh(user);
  }

}
