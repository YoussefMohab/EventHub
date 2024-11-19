import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ATTENDEE = 'Attendee',
  ORGANIZER = 'Organizer',
  ADMIN = 'Admin',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The possible roles for User',
});
