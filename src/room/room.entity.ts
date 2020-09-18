import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {UserEntity} from "../user/user.entity";
import { SubscriptionType } from '../user/user.dto';
import { OpenSpaceEntity } from '../open_space/open_space.entity';
import { OpenSpaceRO } from '../open_space/open_space.dto';
import { RoomRO } from './room.dto';
import { ReservationEntity } from '../reservation/reservation.entity';

@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @ManyToOne(type => OpenSpaceEntity, openSpace => openSpace.id,{eager: true})
    @JoinColumn()
    openSpace: OpenSpaceEntity;


/*
  @ManyToMany(type => ReservationEntity, reservation => reservation.room, {
    cascade: true
  })
  @JoinTable()
  reservations: ReservationEntity[];*/

  toResponseObject(): RoomRO {
    let res =[];
    return {id:this.id,name:this.name,description:this.description,openSpace:this.openSpace};
  }
}