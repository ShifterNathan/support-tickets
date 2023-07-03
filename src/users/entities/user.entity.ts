import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from 'typeorm';
import { Claim } from '../../claims/entities/claim.entity';

@Entity({name: "users"})
@ObjectType()
export class User {
  
  @PrimaryGeneratedColumn('increment')
  @Field( () => Int )
  id: number;

  @Column()
  @Field( () => String)
  fullName: string;

  @Column({ unique: true })
  @Field( () => String)
  email: string;  
  
  @Column()
  // @Field( () => String)
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  @Field( () => [String])
  roles: string[]; 

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field( () => Boolean)
  isActive: boolean;

  @ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
  @JoinColumn({ name: 'lastUpdateBy'} )
  @Field( () => User, { nullable: true })
  lastUpdateBy?: User;

  @OneToMany( () => Claim, (claim) => claim.user )
  @Field( () => [Claim] )
  claims: Claim[]
}
