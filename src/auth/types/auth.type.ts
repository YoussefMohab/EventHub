import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Auth')
export class AuthType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;
}