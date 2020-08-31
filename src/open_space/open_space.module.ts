import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import { OpenSpaceService } from './open_space.service';
import { OpenSpaceController } from './open_space.controller';
import { OpenSpaceEntity } from './open_space.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OpenSpaceEntity]),AuthModule],
  providers: [OpenSpaceService],
  controllers:[OpenSpaceController],
  exports: [OpenSpaceService],
})
export class OpenSpaceModule {}