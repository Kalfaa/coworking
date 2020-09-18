import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { RoomRO } from '../room/room.dto';
import { ToolRO } from '../tools/tool.dto';


export class ReservationRO {
  @ApiPropertyOptional()
  id:string
  @ApiPropertyOptional()
  start: Date;
  @ApiPropertyOptional()
  end: Date;
  @ApiPropertyOptional()
  food:number;
  @ApiPropertyOptional()
  room:RoomRO;
  @ApiPropertyOptional()
  tools:ToolRO[]
}

export class ReservationCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  start: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  end: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  food: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  room: string;


  @ApiPropertyOptional()
  @IsNotEmpty()
  tools: string[];
}

export class AddTools{
  @ApiPropertyOptional()
  @IsNotEmpty()
  tools: string[];
}


export class BeetweenDate{
    @ApiPropertyOptional()
    @IsNotEmpty()
    start: Date;
}