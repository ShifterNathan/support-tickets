import { BadRequestException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID, IsUUID } from 'class-validator';
import { FilesService } from 'src/common/files/files.service';
import { Like, Repository } from 'typeorm';

import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimInput } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';


@Injectable()
export class ClaimsService {

  constructor(
    @InjectRepository( Claim )
    private readonly claimRepository: Repository<Claim>,

    private readonly fileService: FilesService
    
  ){}
  
  async create( createClaimDto: CreateClaimDto, file: Express.Multer.File): Promise<CreateClaimDto> {

    if ( !file ) {
      throw new BadRequestException('Make sure the csv file is uploaded ')
    }

    const csv_data = this.fileService.uploadFile(file)
    const claim_number = await this.getNextClaimNumber();

    try{
      const claim = this.claimRepository.create({...createClaimDto, csv_data, claim_number});
      await this.claimRepository.save(claim);
      return claim;
    }

    catch(error){
      console.log("error code:", error.code)
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

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findOneByTerm(term: string): Promise<Claim> {
    console.log(term);
    
    const isNumber = !isNaN(+term); 
    
    let conditions: {}[] = []; 

    if (isUUID(term)) conditions.unshift({ id: term })
    if (isNumber) conditions.push({ claim_number: term })
    if (term) conditions.push({ title: Like(`%${term.trim().toLocaleLowerCase().normalize('NFD')}%`) })
    

    const claim = await this.claimRepository.findOne({
      where: conditions,
    });
    
    if (!claim) {
      throw new NotFoundException(`Claim with term '${term}' not found`);
    }
    
    return claim;
  }

  async findOneById(id: string): Promise<Claim> {

    return await this.claimRepository.findOneBy({ id })
  }


  async update(term: string, updateClaimInput: UpdateClaimInput) {
    
    const claim = await this.findOneByTerm(term)

    if(!claim) throw new NotFoundException(`Claim with term '${term}' not found`)

    const updatedClaim = {...claim, ...updateClaimInput}
    
    return this.claimRepository.save(updatedClaim);
  }

  async remove(id: string): Promise<Claim> {

    const claim = await this.findOneById( id );
    await this.claimRepository.delete({id: claim.id})

    return {...claim, id}
  }
}
