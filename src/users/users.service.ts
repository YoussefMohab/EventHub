import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from './user-role.enum';
import { User, Prisma } from '@prisma/client';
import { AuthInput } from 'src/auth/auth.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findUserById(id: string, user: User): Promise<User> {
    if (user.role === UserRole.ADMIN || user.id === id) {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    }
    throw new UnauthorizedException('You do not have permission to access this user.');
  }

  async findAllUsers(role: string, page = 1, limit = 10): Promise<User[]> {
    if (role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }
    const skip = (page - 1) * limit;
    return this.prisma.user.findMany({
      skip,
      take: limit,
      include: {
        events: {
          include: {
            organizer: true,
          }
        },
        rsvps: {
          include: {
            event: true,
            user: true,
          },  
        },
      }
    });
  }

  async createUser(authInput: AuthInput): Promise<User> {
    return this.usersRepository.createUser(authInput);
  }

  async deleteUser(id: string, user: User): Promise<string> {
    if (user.role === UserRole.ADMIN || user.id === id) {
        const result = await this.prisma.user.delete({ where: { id } });
        if (result) return "User deleted successfully";
        else return "Failed to delete";
    } 
    throw new UnauthorizedException('You do not have permission to access this user.')
  }
}
