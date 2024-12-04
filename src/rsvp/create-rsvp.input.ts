import { InputType, Field } from '@nestjs/graphql';
import { RSVPStatus } from './rsvp-status.enum'; // Enum for RSVP status
import { IsEnum, IsMongoId, IsUUID } from 'class-validator';

@InputType()
export class CreateRsvpInput {
  // @IsMongoId()
  @IsUUID()
  @Field()
  eventId: string;

  @IsEnum(RSVPStatus)
  @Field(() => RSVPStatus)
  status: RSVPStatus;
}
