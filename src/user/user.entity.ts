
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SubscriptionType, UserRO } from './user.dto';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriptionEntity } from '../subscription/subscription.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'varchar',
        unique: true,
    })
    username: string;

    @Column('text')
    password: string;

    @Column('boolean',{
        default: false
    })
    isAdmin:boolean;

    @OneToOne(type => SubscriptionEntity,sub=>sub.user)
    subscription: SubscriptionEntity;


  @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(): UserRO {
        return {id:this.id,created:this.created,username:this.username,isAdmin:this.isAdmin};
    }

    }