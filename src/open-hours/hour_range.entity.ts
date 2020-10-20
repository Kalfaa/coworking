import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from '../user/user.entity';
import { SubscriptionType } from '../user/user.dto';
import { ToolEntity } from '../tools/tool.entity';
import { RoomEntity } from '../room/room.entity';
import {SubscriptionEntity} from "../subscription/subscription.entity";

@Entity('hour_range')
export class HourRangeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        type: 'int',
    })
    start:number;
    @Column({
        type: 'int',
    })
    end:number;
}