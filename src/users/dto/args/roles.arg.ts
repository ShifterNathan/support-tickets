import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import { ValidRoles } from "../../../auth/enums/valid-roles.enum";

@ArgsType()
export class validRolesArgs {

    @Field( () => [ValidRoles], { nullable: true } )
    @IsArray()
    roles: ValidRoles[] = []
}