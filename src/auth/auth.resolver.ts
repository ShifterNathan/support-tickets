import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { SignUpinput, LoginInput } from './dtos/inputs/';
import { AuthResponse } from './types/auth-response.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ValidRoles } from './enums/valid-roles.enum';

@Resolver()
export class AuthResolver {
  constructor( private readonly authService: AuthService ) {}

  // @Mutation( () => AuthResponse, {name: 'signUp'})
  // signUp( @Args('signUpInput') signUpInput: SignUpinput ): Promise<AuthResponse> {
  //   return this.authService.signUp( signUpInput )
  // }

  // @Mutation( () => AuthResponse, {name: 'login'})
  // login( @Args('loginInput') loginInput: LoginInput ): Promise<AuthResponse> {
  //   return this.authService.login( loginInput )
  // }

  @Query( () => AuthResponse, {name: 'revalidate'})
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @CurrentUser( /**[ ValidRoles.admin ] */) user: User
  ): AuthResponse {
    console.log('revalidateToken, user:', user);
       
    return this.authService.revalidateToken( user );
  }


}

