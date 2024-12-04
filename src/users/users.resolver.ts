import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { ParseObjectIdPipe } from './pipes/userid.pipe';
import { User } from '@prisma/client';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/get-user.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorartor';
import { UserRole } from './user-role.enum';

@Resolver(() => UserType)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserResolver {
    constructor(private readonly userService: UsersService) {}

    @Query(() => UserType)
    async user(@Args('id', ParseUUIDPipe) id: string, @CurrentUser() user: User): Promise<User> {
        return this.userService.findUserById(id, user);
    }

    @Query(() => [UserType])
    async users(@CurrentUser() user: User): Promise<User[]> {
        return this.userService.findAllUsers(user.role);
    }

    @Roles(UserRole.ADMIN)
    @Mutation(() => String)
    async deleteUser(@Args('id', ParseUUIDPipe) id: string, @CurrentUser() user: User): Promise<string>{
        return this.userService.deleteUser(id, user);
    }

}
