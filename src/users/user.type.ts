import { Field, ObjectType, ID } from "@nestjs/graphql";
import { UserRole } from "./user-role.enum";
import { EventType } from "../events/event.type";
import { RSVPType } from "../rsvp/rsvp.type";

@ObjectType('User')
export class UserType {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field()
    role: UserRole;

    @Field(() => [EventType], { nullable: true })
    events?: EventType[];

    @Field(() => [RSVPType], { nullable: true })
    rsvps?: RSVPType[];
}