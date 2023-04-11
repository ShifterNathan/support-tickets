import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim } from './entities/claim.entity';
import { FilesService } from '../common/files/files.service';
import { FilesModule } from 'src/common/files/files.module';
import { ClaimsResolver } from './claims.resolver';

@Module({
  controllers: [ClaimsController],
  providers: [ClaimsService, FilesService, ClaimsResolver],
  imports: [
    TypeOrmModule.forFeature([ Claim ]),
    
    FilesModule
  ],
})
export class ClaimsModule {}
