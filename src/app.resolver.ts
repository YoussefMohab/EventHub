import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class DebugResolver {
  @Query(() => String)
  testQuery(): string {
    return 'Schema is working!';
  }
}
