import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Length, Matches } from "class-validator";

@InputType()
export class AuthInput {
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Length(8, 32)
    @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
    @Field()
    password: string;
}