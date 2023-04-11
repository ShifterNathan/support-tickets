import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field(() => ID)
  @IsInt()
  id: number;

  @Field( () => [ ValidRoles ], { nullable: true })
  @IsArray()
  @IsOptional()
  roles?: ValidRoles[];

  @Field( () => Boolean, { nullable: true  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
