import { registerEnumType } from "@nestjs/graphql";


export enum ValidRoles {
    user      = 'user',
    admin     = 'admin',
    superAdmin = 'superAdmin'
}

registerEnumType( ValidRoles, { name: 'ValidRoles'} )