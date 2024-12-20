import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RsvpService } from './rsvp.service';
import { RSVPType } from './rsvp.type';
import { RSVP, User } from '@prisma/client';
import { CreateRsvpInput } from './create-rsvp.input';
import { ParseObjectIdPipe } from '../users/pipes/userid.pipe';
import { RSVPStatus } from './rsvp-status.enum';
import { CurrentUser } from '../auth/decorators/get-user.decorators';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => RSVPType)
@UseGuards(JwtAuthGuard)
export class RsvpResolver {
  constructor(private readonly rsvpService: RsvpService) {}

  @Query(() => [RSVPType])
  async getRSVPs(@Args('eventId') eventId: string, @CurrentUser() user: User): Promise<RSVP[]> {
    return this.rsvpService.getRsvpsForEvent(eventId, user);
  }

  @Mutation(() => RSVPType)
  async createRsvp(
    @Args('createRsvpInput') createRsvpInput: CreateRsvpInput,
    @CurrentUser() user: User,
  ): Promise<RSVP> {
    return this.rsvpService.createRsvp(createRsvpInput, user);
  }

  @Mutation(() => RSVPType)
  async updateRsvpStatus(
    @Args('rsvpId', ParseUUIDPipe) rsvpId: string,
    @Args('status') status: RSVPStatus,
    @CurrentUser() user: User,
  ): Promise<RSVP> {
    return this.rsvpService.updateRsvpStatus(rsvpId, status, user);
  }

  @Mutation(() => String)
  async deleteRsvp(
    @Args('rsvpId', ParseUUIDPipe) rsvpId: string,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.rsvpService.deleteRsvp(rsvpId, user);
  }
}
