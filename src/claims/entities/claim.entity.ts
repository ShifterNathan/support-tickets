import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Claim {

    @PrimaryGeneratedColumn('uuid')
    @Field( () => ID)
    id: string;

    @Column({ type: "integer", unique: true})
    @Field() 
    claim_number: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;
    
    @Column()
    @Field()
    csv_data: string;    

    @ManyToOne( () => User, (user) => user.claims )
    @Field( () => User)
    user: User;

}
