import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthRefresh {
  @Field()
  accessToken: string;
}
