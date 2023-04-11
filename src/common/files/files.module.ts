import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  controllers: [],
  providers: [ FilesService ],
  imports: [],
  exports: [ FilesService ]
})
export class FilesModule {}
