import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventType } from './event.type';
import { EventsService } from './events.service';
import { CurrentUser } from '../auth/decorators/get-user.decorators';
import { User, Event } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventInput } from './event.input';
import { ParseObjectIdPipe } from 'src/users/pipes/userid.pipe';

@Resolver(() => EventType)
@UseGuards(JwtAuthGuard)
export class EventsResolver {
    constructor(private readonly eventsService: EventsService) {}

    @Query(() => [EventType])
    async events(@CurrentUser() user: User): Promise<Event[]> {
      return this.eventsService.findAll(user);
    }

    @Mutation(() => EventType)
    async createEvent(@Args('createEventInput') createEventInput: EventInput, @CurrentUser() user: User) {
        return this.eventsService.create(createEventInput, user);
    }

    @Mutation(() => EventType)
    async updateEvent(@Args('id', ParseObjectIdPipe) eventId: string, @Args('updateEventInput') updateEventInput: EventInput, @CurrentUser() user: User) {
        return this.eventsService.update(eventId, updateEventInput, user);
    }
}
