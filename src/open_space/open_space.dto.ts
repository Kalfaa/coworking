import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { ToolRO } from '../tools/tool.dto';
import {RoomRO} from "../room/room.dto";
import {RoomEntity} from "../room/room.entity";
import {OpenHoursEntity} from "../open-hours/open-hours.entity";
import {EventRO} from "../event/event.dto";


export class OpenSpaceRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
  @ApiPropertyOptional()
  tools: ToolRO[];
  @ApiPropertyOptional()
  rooms: RoomEntity[];
  @ApiPropertyOptional()
  openHours: OpenHoursEntity;
  @ApiPropertyOptional()
  events: EventRO[];
}

export class OpenSpaceCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  description: string;
  openHours: any;
}

export class OpenHours {
    monday: any;
    tuesday: any;
    wednesday: any;
    thursday: any;
    friday: any;
    saturday: any;
    sunday: any;
}

export class HourRange {
    start:number;
    end:number;
}