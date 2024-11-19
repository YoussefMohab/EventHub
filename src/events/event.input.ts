import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsDateString, IsString, Length } from "class-validator";

@InputType()
export class EventInput {
    @IsString()
    @Length(4)
    @Field()
    title: string;

    @IsString()
    @Field()
    description: string;

    @IsDate()
    @Field()
    date: Date;

    @IsString()
    @Field()
    location: string;
}