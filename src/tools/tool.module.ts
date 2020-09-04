
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ToolService } from './tool.service';
import { ToolEntity } from './tool.entity';
import { ToolController } from './tool.controller';



@Module({
  imports: [TypeOrmModule.forFeature([ToolEntity])],
  providers: [ToolService],
  controllers:[ToolController],
  exports: [ToolService],
})
export class ToolModule {}