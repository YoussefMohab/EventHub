import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserType } from '../users/user.type';
import { EventType } from '../events/event.type';
import { RSVPStatus } from './rsvp-status.enum'; // Make sure RSVPStatus is defined

@ObjectType('RSVP')
export class RSVPType {
  @Field(() => ID)
  id: string;

  @Field(() => UserType)
  user: UserType;  // Reference to the User

  @Field(() => EventType)
  event: EventType;  // Reference to the Event

  @Field()
  status: RSVPStatus;  // The RSVP status (Pending, Attending, Declined)

}
