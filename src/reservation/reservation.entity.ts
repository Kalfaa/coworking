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
import { OpenSpaceRO } from '../open_space/open_space.dto';
import { ReservationRO } from './reservation.dto';

@Entity('reservations')
export class ReservationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => RoomEntity,room=>room.id)
    room: RoomEntity;

    @OneToMany(type => ToolEntity, tool => tool.res, { onDelete: 'CASCADE' })
    tools: ToolEntity[];

    @Column("datetime")
    start: Date;

    @Column("datetime")
    end: Date;

    @Column("int")
    food:number;

    @ManyToOne(type => UserEntity,user=>user.id)
    user: UserEntity;


  toResponseObject(): ReservationRO {
    let res =[];
    let user ;
    if(this.tools){
      this.tools.forEach(function(part) {
        res.push( part.toResponseObject())
      });
    }

      if(this.user){
          user= this.user.toResponseObject();
      }

    return {id:this.id,room:this.room.toResponseObject(),tools:this.tools,start:this.start,end:this.end,food:this.food,user:user};
  }
}