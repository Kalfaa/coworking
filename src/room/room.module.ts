import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomEntity } from './room.entity';
import { OpenSpaceModule } from '../open_space/open_space.module';


@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]),OpenSpaceModule],
  providers: [RoomService],
  controllers:[RoomController],
  exports: [RoomService],
})
export class RoomModule {}