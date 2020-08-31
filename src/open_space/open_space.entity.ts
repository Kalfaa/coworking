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
import { OpenSpaceRO } from './open_space.dto';

@Entity('open_space')
export class OpenSpaceEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text',{
    default: ''
    })
    description:string;

    @OneToMany(type => ToolEntity, tool => tool.openSpace)
    tools: ToolEntity[];

    toResponseObject(): OpenSpaceRO {
      return {id:this.id,name:this.name,description:this.description};
    }
}