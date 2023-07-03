import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}


  @Mutation( () => Boolean, { name: 'excuteSeed', description: 'Execute database build construction' }) 
  async excuteSeed(): Promise<boolean>{
     return this.seedService.executeSeed();
  }

}
