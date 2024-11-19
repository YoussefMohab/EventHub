import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthInput } from "../auth/auth.input";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { UserRole } from "./user-role.enum";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(authInput: AuthInput): Promise<User> {
        const { email, password } = authInput;
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({ data: { email, password: hashedPassword, role: UserRole.ATTENDEE } });
    }
}