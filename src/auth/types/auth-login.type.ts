import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthLogin {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
