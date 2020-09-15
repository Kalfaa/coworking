import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { OpenSpaceModule } from './open_space/open_space.module';
import {ReservationModule} from "./reservation/reservation.module";
import {RoomModule} from "./room/room.module";


@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule,OpenSpaceModule,ReservationModule,
      RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
