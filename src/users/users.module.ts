import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { UserResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
