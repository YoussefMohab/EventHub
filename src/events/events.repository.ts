import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from 'src/users/user-role.enum';
import { EventInput } from './event.input';
import { User, Event } from '@prisma/client';
import e from 'express';

@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(createEventInput: EventInput, user: User): Promise<Event> {
    const { title, description, date, location } = createEventInput;
    if (user.role === UserRole.ORGANIZER) {
      return this.prisma.event.create({
        data: {
          title,
          description,
          date,
          location,
          organizerId: user.id,
        },
      });
    }
  }

  async updateEvent(eventId: string, updateEventInput: EventInput, user: User): Promise<Event> {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (user.role !== UserRole.ADMIN && user.id !== event.organizerId) {
    const { title, description, date, location } = updateEventInput;
      return await this.prisma.event.update({ where: { id: eventId }, data: {
        title: title || event.title,
        description: description || event.description,
        date: date || event.date,
        location: location || event.location,
      } });
    }
    throw new UnauthorizedException('You can only update events you organize.');
  }
}
