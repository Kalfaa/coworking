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
import {UserEntity} from "../user/user.entity";
import { SubscriptionType } from '../user/user.dto';
import { OpenSpaceEntity } from '../open_space/open_space.entity';
import { ToolEntity } from '../tools/tool.entity';
import { RoomEntity } from '../room/room.entity';

@Entity('reservations')
export class ReservationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => RoomEntity, room => room.id)
    openSpace: RoomEntity;

    @OneToMany(type => ToolEntity, tool => tool.id)
    tools: ToolEntity[];

    @Column("date")
    from: Date;

    @Column("date")
    to: Date;

    @Column("int")
    food:number;

}