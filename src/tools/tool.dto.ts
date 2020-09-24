import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class ToolRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  type:ToolType;
}

export class ToolCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()
  type: string;
}

export enum ToolType {
    TOOL = "TOOL",
    PRINTER = "PRINTER",
    LAPTOP ="LAPTOP"
}