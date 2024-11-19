import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { PrismaService } from '../prisma/prisma.service';
import { User, Event } from '@prisma/client';
import { UserRole } from '../users/user-role.enum';
import { EventInput } from './event.input';

@Injectable()
export class EventsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly eventsRepository: EventsRepository,
    ) {}

    async findAll(user: User): Promise<Event[]> {
        if (user.role === UserRole.ADMIN) {
            return this.prisma.event.findMany({
                include: {
                    organizer: true, // Adjust the relation name based on your Prisma schema
                    attendees: (user.role === UserRole.ADMIN),
                },
            });
        }
        throw new UnauthorizedException();
    }

    async create(createEventInput: EventInput, user: User): Promise<Event> {
        return await this.eventsRepository.createEvent(createEventInput, user);
    }

    async update(eventId: string, updateEventInput: EventInput, user: User): Promise<Event> {
        return await this.eventsRepository.updateEvent(eventId, updateEventInput, user);
    }
}
