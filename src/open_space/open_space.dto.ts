import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';


export class OpenSpaceRO {
  @ApiPropertyOptional()
  id: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  description: string;
}

export class OpenSpaceCreation {
  @ApiPropertyOptional()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional()
  @IsNotEmpty()

  description: string;
}