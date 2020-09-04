import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { ToolRO } from '../tools/tool.dto';
import { OpenSpaceRO } from '../open_space/open_space.dto';


export class RoomRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
  @ApiPropertyOptional()
  openSpace:OpenSpaceRO
}

export class RoomCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  description: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  openSpace:string;
}