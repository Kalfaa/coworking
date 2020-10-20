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
import {OpenSpaceRO} from "../open_space/open_space.dto";
import {EventRO} from "./event.dto";
import {OpenSpaceEntity} from "../open_space/open_space.entity";

@Entity('event')
export class EventEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text',{
    default: ''
    })
    description:string;

    @Column('text',{
        default: ''
    })
    image:string;

    @Column("datetime")
    date: Date;

    @ManyToOne(type => OpenSpaceEntity, openSpace => openSpace.id,{eager: true})
    @JoinColumn()
    openSpace: OpenSpaceEntity;

    toResponseObject(): EventRO {
      return {id:this.id,name:this.name,description:this.description,image:this.image,date:this.date};
    }
}