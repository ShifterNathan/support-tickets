import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Claim } from './entities/claim.entity';
import { User } from '../users/entities/user.entity';

import { ClaimsService } from './claims.service';
import { UpdateClaimInput } from './dto/update-claim.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Claim)
@UseGuards(JwtAuthGuard)
export class ClaimsResolver {

    constructor(
        private readonly claimsService: ClaimsService
    ){}

    @Query(() => [Claim], {name: 'AllClaims'})
    async findAll(
        @CurrentUser() user: User
    ): Promise<Claim[]> {
        return this.claimsService.findAll(user);
    }

    @Query(() => Claim, {name: 'ClaimByTerm'})
    async findOne(
        @Args('term', { type: () => String }) term: string,
        @CurrentUser() user: User
    ): Promise<Claim> {
        return this.claimsService.findOneByTerm(term, user);
    }

    @Mutation(() => Claim, {name: 'updateClaim'} )
    updateClaim(
        @Args('updateClaimInput') updateClaimInput: UpdateClaimInput,
        @CurrentUser() user: User
    ): Promise<Claim> {
        return this.claimsService.update(updateClaimInput, user);
    }

    @Mutation( () => Claim, {name: 'deleteClaim'})
    delete(
        @Args('id', { type: () => ID }) id: string,
        @CurrentUser() user: User
    ): Promise<Claim> {
        return this.claimsService.remove(id, user)
    }


} 
