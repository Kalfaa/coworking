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
import {HourRangeEntity} from "./hour_range.entity";

@Entity('open_hours')
export class OpenHoursEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    monday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    tuesday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    wednesday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    thursday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    friday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    saturday:HourRangeEntity ;

    @OneToOne(openHours => HourRangeEntity,{eager:true,cascade: true})
    @JoinColumn()
    sunday:HourRangeEntity ;

}