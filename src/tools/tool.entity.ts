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
import { OpenSpaceEntity } from '../open_space/open_space.entity';
import { OpenSpaceRO } from '../open_space/open_space.dto';
import { ToolRO } from './tool.dto';

@Entity('tools')
export class ToolEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @ManyToOne(type => OpenSpaceEntity, openSpace => openSpace.id)
    openSpace: OpenSpaceEntity;

    toResponseObject(): ToolRO {
      return {id:this.id,name:this.name};
    }
}