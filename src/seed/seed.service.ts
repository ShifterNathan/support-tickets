import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'fs';
import { join } from 'path';

import { SEED_USERS, SEED_CLAIMS } from './data/seed-data';

import { User } from '../users/entities/user.entity';
import { Claim } from '../claims/entities/claim.entity';

import { UsersService } from '../users/users.service';
import { ClaimsService } from '../claims/claims.service';



@Injectable()
export class SeedService {

    private isProd: boolean;


    constructor(
        private readonly configService: ConfigService,

        @InjectRepository(Claim)
        private readonly claimsRepository: Repository<Claim>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly usersService: UsersService,
        private readonly claimsService: ClaimsService,

    ) {
        this.isProd = configService.get('STATE') === 'prod';
    }

    async executeSeed() {

        if (this.isProd) {
            throw new UnauthorizedException('The seed cannot be runned on production');
        }

        await this.deleteDatabase();
        await this.deleteStoredFiles();
        const user = await this.loadUsers();

        return true;

    }

    async deleteDatabase() {

        // delete items
        await this.claimsRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

        // delete users
        await this.usersRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute();

    }

    /*  
        Parallelized file deletion using Promise.all and map provides 
        high performance when dealing with large number of files 
    */
    private async deleteStoredFiles() {
        const claimsFolderPath = join(__dirname, '../../static/claims/');

        try {
            if (!fs.existsSync(claimsFolderPath)) {
                throw new Error(`Claims folder does not exist: ${claimsFolderPath}`);
            }

            const files = await fs.promises.readdir(claimsFolderPath);

            await Promise.all(
                files.map(async (fileName) => {
                    const filePath = join(claimsFolderPath, fileName);

                    try {
                        await fs.promises.unlink(filePath);
                        console.log(`Deleted file: ${filePath}`);
                    } catch (error) {
                        console.error(`Error deleting file: ${filePath}`, error);
                    }
                })
            );
        } catch (error) {
            console.error('Error reading claims folder:', error);
        }
    }

    async loadUsers(): Promise<User> {
        
        const users = [];

        for ( const user of SEED_USERS ) {
            users.push( await this.usersService.create( user ) )
        }

        return users[0];
    }

}
