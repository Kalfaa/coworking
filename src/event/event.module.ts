import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import { ToolModule } from '../tools/tool.module';
import { RoomModule } from '../room/room.module';
import {EventEntity} from "./event.entity";
import {EventService} from "./event.service";
import {EventController} from "./event.controller";


@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]),AuthModule],
  providers: [EventService],
  controllers:[EventController],
  exports: [EventService],
})
export class EventModule {}