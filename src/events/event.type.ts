import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "../users/user.type";
import { RSVPType } from "../rsvp/rsvp.type";

@ObjectType('Event')
export class EventType {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => GraphQLISODateTime)
    date: Date;

    @Field()
    location: string;

    @Field(() => UserType, { nullable: true }) // To include the organizer details
    organizer?: UserType;

    @Field(() => [RSVPType], { nullable: true })
    attendees?: RSVPType[];
}