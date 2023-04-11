import { IsEmail, MinLength } from "class-validator";

export class LoginInput {

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}