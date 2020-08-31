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
import { ToolEntity } from '../tools/tool.entity';
import { RoomEntity } from '../room/room.entity';

@Entity('open_space')
export class OpenSpaceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description:string;

    @OneToMany(type => ToolEntity, tool => tool.openSpace)
    tools: ToolEntity[];


    @Column("date")
    end: Date;
}