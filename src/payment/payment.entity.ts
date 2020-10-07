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
import {SubscriptionType, UserRO} from '../user/user.dto';
import {PaymentRO} from "./payment.dto";

@Entity('payment')
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => UserEntity,user =>user.id)
    user: UserEntity;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'int',
        unique: true,
    })
    mount: number;

    toResponseObject(): PaymentRO {
        return {id:this.id,created:this.created,mount:this.mount};
    }
}