import { InputType, ID, Field, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength, isUUID } from 'class-validator';
import { CreateClaimDto } from './create-claim.dto';

@InputType()
export class UpdateClaimInput extends PartialType(CreateClaimDto) {

    @Field(() => String)
    @IsUUID()
    id: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @MinLength(3, {message: 'The title should be at least 3 characters long'})
    title: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @MinLength(3, {message: 'The description should be at least 3 characters long'})
    description: string;
}
