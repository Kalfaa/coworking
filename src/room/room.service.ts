import { AddSubscription } from '../user/user.dto';
import { BasicCrudService } from '../basic_crud.service';
import { ToolEntity } from '../tools/tool.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import { RoomEntity } from './room.entity';

export class RoomService extends BasicCrudService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomEntityRepository: Repository<RoomService>
  ) {
    super(roomEntityRepository)
  }
}