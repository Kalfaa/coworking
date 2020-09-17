import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { ToolRO } from '../tools/tool.dto';
import {RoomRO} from "../room/room.dto";
import {RoomEntity} from "../room/room.entity";


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

}

export class OpenSpaceCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()

  description: string;
}