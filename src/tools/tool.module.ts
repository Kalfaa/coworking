
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ToolService } from './tool.service';
import { ToolEntity } from './tool.entity';



@Module({
  imports: [TypeOrmModule.forFeature([ToolEntity])],
  providers: [ToolService],
  controllers:[],
  exports: [ToolService],
})
export class ToolModule {}