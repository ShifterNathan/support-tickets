import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginInput, SignUpinput } from './dtos/inputs';
import { AuthResponse } from './types/auth-response.type';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService

    ){}

    @Post()
    @UsePipes(ValidationPipe)
    signUp( @Body() signUpInput: SignUpinput ): Promise<AuthResponse> {
        return this.authService.signUp( signUpInput )
    }

    @Post('login')
    login( @Body() loginInput: LoginInput ): Promise<AuthResponse> {
        return this.authService.login( loginInput )
    }
}
