import { InputType, Field } from '@nestjs/graphql';
import { RSVPStatus } from './rsvp-status.enum'; // Enum for RSVP status
import { IsEnum, IsMongoId } from 'class-validator';

@InputType()
export class CreateRsvpInput {
  @IsMongoId()
  @Field()
  eventId: string;

  @IsEnum(RSVPStatus)
  @Field(() => RSVPStatus)
  status: RSVPStatus;
}
