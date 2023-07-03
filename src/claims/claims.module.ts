import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim } from './entities/claim.entity';
import { ClaimsResolver } from './claims.resolver';

import { FilesService } from '../common/files/files.service';
import { FilesModule } from '../common/files/files.module';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, FilesService, ClaimsResolver],
  imports: [
    TypeOrmModule.forFeature([ Claim ]),
    FilesModule
  ],
  exports: [
    ClaimsService,
    TypeOrmModule,
  ]
})
export class ClaimsModule {}
