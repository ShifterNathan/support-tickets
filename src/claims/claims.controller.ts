import { Controller, Post, Body, Param, Delete, UploadedFile, UseInterceptors, ParseUUIDPipe, UseGuards, Get, Query, UploadedFiles } from '@nestjs/common';


import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
import { diskStorage } from 'multer';

import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from '../common/helpers'

import { User } from '../users/entities/user.entity';

import { ClaimsService } from './claims.service';

import { CreateClaimDto } from './dto/create-claim.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { paginationDto } from '../common/dtos/pagination.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Controller('claim')
@UseGuards(JwtAuthGuard)
export class ClaimsController {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {}

  @Post()
  @UseInterceptors( FileFieldsInterceptor([{name: 'csv', maxCount: 1},{name: 'img', maxCount: 3}], {
    fileFilter: fileFilter,
    //limits: {fileSize: 1000},
    storage: diskStorage({
      destination: './static/claims',
      filename: fileNamer
      
    })
   }))
  create(
    @Body() createClaimDto: CreateClaimDto, 
    @UploadedFiles() file: {csv: Express.Multer.File[], img: Express.Multer.File[]},
    @CurrentUser() user: User
    ) {
    
    const { csv, img } = file
    const imgFile = img ? img[0] : null
    
    return this.claimsService.create(createClaimDto, csv[0], imgFile, user);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.claimsService.remove(id, user);
  // }


}
