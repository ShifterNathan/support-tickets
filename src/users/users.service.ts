import { Injectable, BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

import { UpdateUserInput } from './dto/inputs/update-user.input';
import { SignUpinput } from '../auth/dtos/inputs/signUp.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User> 
  ){}

  async create(signUpInput: SignUpinput): Promise<User> {

    try {
      const newUser = this.usersRepository.create({ 
        ...signUpInput, 
        password: bcrypt.hashSync( signUpInput.password, 10 ) });


      return await this.usersRepository.save( newUser );
    }

    catch (error) {
      this.handleDBErrors( error );
    }
  }

  async findAll( roles: ValidRoles[] ): Promise<User[]> {

    if ( roles.length === 0) return this.usersRepository.find({
      // replaced by lazy property:
      // relations: {
      //   lastUpdateBy: true
      // }
    });

    return this.usersRepository.createQueryBuilder()
    .where('ARRAY[roles] && ARRAY[:...roles]')
    .setParameter('roles', roles)
    .getMany();

    
  } 

  async findOneByEmail( email: string ): Promise<User> {
    try { 
      return await this.usersRepository.findOneByOrFail({ email })
    }
    catch (error) {
      throw new NotFoundException(`${ email } not found`);
      
      // for custom errors:

      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } not found`
      // })
    }
  }

  async findOneById( id: number ): Promise<User> {
    try { 
      return await this.usersRepository.findOneByOrFail({ id })
    }
    catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }

  async update(
    id: number, 
    updateUserInput: UpdateUserInput,
    updateBy: User,
    ): Promise<User> {

      try {
        const user = await this.usersRepository.preload({
          ...updateUserInput, id
        });

        user.lastUpdateBy = updateBy;

        return await this.usersRepository.save( user );
      }
      catch ( error ) {
        this.handleDBErrors( error );
      }

  }

  async block(id: number, adminUser: User): Promise<User> {

    const userToBlock = await this.findOneById( id )

    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = adminUser;

    return await this.usersRepository.save( userToBlock );
  }

  private handleDBErrors( error: any ): never {

    if(error.code === '23505'){
       throw new BadRequestException( error.detail.replace('Key ','') );
    }

    if ( error.code == 'error-001'){
      throw new BadRequestException( error.detail.replace('Key ','') );
    }

    this.logger.error( error );

    throw new InternalServerErrorException('Please check server logs');
  }
}
