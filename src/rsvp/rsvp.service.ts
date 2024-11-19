import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RsvpRepository } from './rsvp.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRsvpInput } from './create-rsvp.input';
import { RSVP, User } from '@prisma/client';
import { RSVPStatus } from './rsvp-status.enum';
import { UserRole } from 'src/users/user-role.enum';

@Injectable()
export class RsvpService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rsvpRepository: RsvpRepository,
  ) {}

  async createRsvp(createRsvpInput: CreateRsvpInput, user: User): Promise<RSVP> {
    const { eventId, status } = createRsvpInput;
    return this.prisma.rSVP.create({ data: { userId: user.id, eventId, status } });
  } 

  async updateRsvpStatus(id: string, status: RSVPStatus, user: User): Promise<RSVP> {
    const rsvp = await this.prisma.rSVP.findUnique({ where: { id } });
    if (!rsvp || rsvp.userId !== user.id) {
        throw new UnauthorizedException('You can only update your RSVPs.');
    }
    return this.prisma.rSVP.update({ where: { id }, data: { status } });
  }

  async deleteRsvp(id: string, user: User): Promise<string> {
    const rsvp = await this.prisma.rSVP.findUnique({ where: { id } });
    if (!rsvp || rsvp.userId !== user.id) {
        throw new UnauthorizedException('You can only update your RSVPs.');
    }
    const result = await this.prisma.rSVP.delete({ where: { id } });
    if (result) return "Deleted";
    throw new NotFoundException();
  }

  async getRsvpsForEvent(eventId: string, user: User): Promise<RSVP[]> {
    if (user.role === UserRole.ADMIN || UserRole.ORGANIZER) {
        return this.prisma.rSVP.findMany({ where: { eventId }, include: { user: true } });
    }
    throw new UnauthorizedException();
  }
  
}
