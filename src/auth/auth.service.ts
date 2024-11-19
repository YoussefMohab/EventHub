import { Injectable } from '@nestjs/common';
import { AuthInput } from './auth.input';
import { AuthRepository } from './auth.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(authInput: AuthInput, reply: FastifyReply): Promise<{ accessToken: string, refreshToken: string }> {
    return this.authRepository.login(authInput, reply);
  }

  async refresh(user: User): Promise<{ accessToken: string }> {
    return this.authRepository.refresh(user);
  }
}
