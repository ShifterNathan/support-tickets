import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { FilesService } from 'src/common/files/files.service';
import { And, Like, Repository } from 'typeorm';

import { Claim } from './entities/claim.entity';
import { User } from '../users/entities/user.entity';

import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimInput } from './dto/update-claim.dto';
import { paginationDto } from '../common/dtos/pagination.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ClaimsService {

  constructor(
    @InjectRepository( Claim )
    private readonly claimRepository: Repository<Claim>,

    private readonly fileService: FilesService
    
  ){}
  
  async create( 
    createClaimDto: CreateClaimDto, 
    csv: Express.Multer.File, 
    img: Express.Multer.File,
    user: User
  ): Promise<CreateClaimDto> {

    if ( !csv ) {
      throw new BadRequestException('Make sure the csv file is uploaded ')
    }

    const csv_data = this.fileService.uploadFile(csv, 'csv')

    let img_data = this.fileService.uploadFile(img, 'img')
    
    
    const claim_number = await this.getNextClaimNumber();

    try{
      const claim = this.claimRepository.create(
        {...createClaimDto, csv_data, img_data, claim_number, user}
      );
      await this.claimRepository.save(claim);
      return claim;
    }

    catch(error){
      console.log('error create');
      
      // console.log("error code:", error.code)
    }
  }

  async getNextClaimNumber(): Promise<number> {
    const claimNumbers = await this.claimRepository
      .createQueryBuilder('claim')
      .select('claim.claim_number')
      .orderBy('claim.claim_number', 'ASC')
      .getMany();

      let nextClaimNumber = 1;
      for (let claim of claimNumbers){
        if(claim.claim_number !== nextClaimNumber){
          break;
        }
        nextClaimNumber++;
      }
      return nextClaimNumber
  }

  // async findAll( paginationDto: PaginationDto) {
  //   return this.claimRepository.find()
  //   .limit(limit)
  //   .skip(offset);
  // }

  // SELECT * FROM claims WHERE userId = '10'
  async findAll( user: User ): Promise<Claim[]> {

    if( user.roles.includes('admin' || 'superAdmin' )) { 
      return this.claimRepository.find()
    }
    else {
      return this.claimRepository.find({
        where: {
          user: {
            id: user.id
          }
        }
      });
    }
  }


  async findOneByTerm(term: string, user: User): Promise<Claim> {
    console.log(term);
    
    const isNumber = !isNaN(+term); 
    
    let conditions: {}[] = []; 

    if (isUUID(term)) conditions.unshift({ id: term })
    if (isNumber) conditions.push({ claim_number: term })
    if (term) conditions.push({ title: Like(`%${term.trim().normalize('NFD')}%`) })
    
    try {
      if( user.roles.includes('admin' || 'superAdmin' )) {
        return await this.claimRepository.findOne({
          where: conditions
        });
      }
      else {
        return await this.claimRepository.findOne({
          where: {
            ...conditions,
            user: {
              id: user.id
            }
          },
        });
      }
    }
    catch(error) {
      throw new NotFoundException(`Claim with term '${term}' not found`);
    }
  }

  async findOneById(id: string, user: User): Promise<Claim> {

    try {
      const claim = await this.claimRepository.findOneBy({id})
      if( user.roles.includes('admin' || 'superAdmin' )) {                
        return claim
      }
      if( claim.user.id !== user.id ) {
        throw new BadRequestException('NO TIENES EL ROL')
      }
      return claim;
    }
    catch(error) {
      throw new NotFoundException(`Claim with id: ${ id } not found`)
    }    
  }


  async update(updateClaimInput: UpdateClaimInput, user: User): Promise<Claim> {
    
    await this.findOneById(updateClaimInput.id, user)

    const claim = await this.claimRepository.preload( updateClaimInput )
    // Without lazy property it should be as follows:
    //const updatedClaim = {...claim, ...updateClaimInput}
    
    return this.claimRepository.save(claim);
  }

  async remove(id: string, user: User): Promise<Claim> {

    const claim = await this.findOneById( id, user );
    await this.claimRepository.remove(claim)

    return {...claim, id}
  }
}
