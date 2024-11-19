import { registerEnumType } from '@nestjs/graphql';

export enum RSVPStatus {
  Pending = 'Pending',
  Attending = 'Attending',
  Declined = 'Declined',
}

registerEnumType(RSVPStatus, {
  name: 'RSVPStatus', // This name will be used in the GraphQL schema
  description: 'The possible statuses for RSVP', // Optional
});
