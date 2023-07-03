import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { ClaimsModule } from '../claims/claims.module';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';


@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    UsersModule,
    ClaimsModule
  ]
})

export class SeedModule {}
