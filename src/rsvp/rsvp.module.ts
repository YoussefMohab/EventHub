import { Module } from '@nestjs/common';
import { RsvpResolver } from './rsvp.resolver';
import { RsvpService } from './rsvp.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RsvpRepository } from './rsvp.repository';

@Module({
  imports: [PrismaModule],
  providers: [RsvpResolver, RsvpService, RsvpRepository],
})
export class RsvpModule {}
