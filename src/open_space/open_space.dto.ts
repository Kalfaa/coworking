import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { ToolRO } from '../tools/tool.dto';


export class OpenSpaceRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
  @ApiPropertyOptional()
  tools: ToolRO[];
}

export class OpenSpaceCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()

  description: string;
}