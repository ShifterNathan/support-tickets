import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { SignUpinput, LoginInput  } from './dtos/inputs/';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private getJwtToken( userId: number ) {
        return this.jwtService.sign({ id: userId }); 
    }

    async signUp( signUpInput: SignUpinput): Promise<AuthResponse> {

        console.log({ signUpInput });
        
        const user = await this.usersService.create( signUpInput );

        //JWT
        const token = this.getJwtToken( user.id )

        return { token, user }
        
    }

    async login( loginInput: LoginInput ): Promise<AuthResponse> {

        const { email, password } = loginInput;
        const user = await this.usersService.findOneByEmail( email );

        if( !bcrypt.compareSync( password, user.password) ){
            throw new BadRequestException('Email or password is incorrect');
        }

        const token = this.getJwtToken( user.id )

        delete user.password;

        return {
            token,
            user,
        }
    }

    async validateUser( id: number): Promise<User> {
        
        const user = await this.usersService.findOneById( id );

        if ( !user.isActive )
            throw new UnauthorizedException(`User is inactive, please contact support`);

        delete user.password;
        return user;
    }

    revalidateToken( user: User ): AuthResponse {

        const token = this.getJwtToken( user.id );

        return { token, user };
    }

}
