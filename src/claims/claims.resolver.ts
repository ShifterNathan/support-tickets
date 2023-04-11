import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClaimsService } from './claims.service';
import { Claim } from './entities/claim.entity';
import { UpdateClaimInput } from './dto/update-claim.dto';

@Resolver(() => Claim)
export class ClaimsResolver {

    constructor(
        private readonly claimsService: ClaimsService
    ){}

    @Query(() => [Claim], {name: 'AllClaims'})
    async findAll(): Promise<Claim[]> {
        return this.claimsService.findAll();
    }

    @Query(() => Claim, {name: 'Claim'})
    async findOne(@Args('term', { type: () => String}) term: string) {
        return this.claimsService.findOneByTerm(term);
    }

    @Mutation(() => Claim )
    updateClaim(@Args('updateClaimInput') updateClaimInput: UpdateClaimInput): Promise<Claim> {
        return this.claimsService.update(updateClaimInput.uuid, updateClaimInput);
    }

}
