import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );  
  app.useGlobalPipes(new ValidationPipe())
  await app.listen({ port: parseInt(process.env.PORT, 10) || 3000 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}
bootstrap();
