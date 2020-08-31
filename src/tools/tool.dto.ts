import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class ToolRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
}

export class ToolCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
}