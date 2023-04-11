import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { validRolesArgs } from './dto/args/roles.arg';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: validRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superAdmin]) user: User
  ): Promise<User[]> {
    return this.usersService.findAll( validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }, ParseIntPipe ) id: number,
    @CurrentUser([ ValidRoles.admin, ValidRoles.superAdmin ]) user: User
  ): Promise<User> {

    return this.usersService.findOneById( +id )
  }

  @Mutation( () => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput, 
    @CurrentUser([ ValidRoles.superAdmin ]) user: User
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user)
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => ID }, ParseIntPipe ) id: number,
    @CurrentUser([ ValidRoles.superAdmin ]) user: User
  ): Promise<User> {
    return this.usersService.block( +id, user );
  }
}
 