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
import {SubscriptionEntity} from "../subscription/subscription.entity";
import {OpenHoursEntity} from "../open-hours/open-hours.entity";
import {EventEntity} from "../event/event.entity";

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

    @OneToMany(type => RoomEntity, room => room.openSpace)
    rooms: RoomEntity[];

    @OneToOne(openHours => OpenHoursEntity,{eager:true,cascade: true})
    @JoinColumn()
    openHours: OpenHoursEntity;

    @OneToMany(type => EventEntity, event => event.openSpace)
    events: EventEntity[];

    toResponseObject(): OpenSpaceRO {
      let res =[];
      this.tools.forEach(function(part) {
        res.push( part.toResponseObject())
      });
      if(this.events!==undefined){
          this.events.forEach(function(part) {
              res.push( part.toResponseObject())
          });
      }


      return {id:this.id,name:this.name,description:this.description,tools:res,rooms:this.rooms,openHours:this.openHours,events:this.events};
    }
}