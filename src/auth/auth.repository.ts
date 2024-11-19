import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthInput } from './auth.input';
import { JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtServise: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    authInput: AuthInput,
    reply: FastifyReply,
  ): Promise<{ accessToken: string, refreshToken: string }> {
    const { email, password } = authInput;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, _id: user.id, role: user.role };
      const accessToken: string = await this.jwtServise.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      });
      const refreshToken: string = await this.jwtServise.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      });
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async refresh(user: User): Promise<{ accessToken: string }> {
    if (!user) {
      throw new Error('No refresh token found');
    }

    const payload = {
      email: user.email,
      _id: user.id,
      role: user.role,
    }

    try {
      const accessToken: string = await this.jwtServise.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      });
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
