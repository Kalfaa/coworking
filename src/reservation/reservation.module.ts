
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ReservationService } from './reservation.service';
import { ReservationEntity } from './reservation.entity';
import { ReservationController } from './reservation.controller';
import { ToolModule } from '../tools/tool.module';



@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity]),ToolModule],
  providers: [ReservationService],
  controllers:[ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}