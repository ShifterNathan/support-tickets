import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateClaimDto {

    @Field(() => String)
    @IsString()
    @IsNotEmpty({message: 'The title should not be empty'})
    @MinLength(3, {message: 'The title should be at least 3 characters long'})
    title: string;

    @Field(() => String)
    @IsString()
    @IsNotEmpty({message: 'The detail should not be empty'})
    @MinLength(10, {message: 'Detail must be at least 10 characters long'})
    description: string;
    
}
