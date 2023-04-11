import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/common/files/files.service';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller('claim')
export class ClaimsController {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {}

  @Post()
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter 
   }))
  create(
    @Body() createClaimDto: CreateClaimDto, 
    @UploadedFile() file: Express.Multer.File, ) {
      
    return this.claimsService.create(createClaimDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.claimsService.remove(id);
  }
}
