import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from "../user/user.entity";
import { SubscriptionType } from '../user/user.dto';

@Entity('subscription')
export class SubscriptionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => UserEntity,user =>user.id)
    @JoinColumn()
    user: UserEntity;

    @Column({
      type: "enum",
      enum: SubscriptionType,
      default: SubscriptionType.NONE
      })
    type:SubscriptionType;

    @Column("date")
    end: Date;

}