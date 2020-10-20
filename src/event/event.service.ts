import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import { BasicCrudService } from '../basic_crud.service';
import { ToolService } from '../tools/tool.service';
import { ToolCreation } from '../tools/tool.dto';
import { ToolEntity } from '../tools/tool.entity';
import {EventEntity} from "./event.entity";





@Injectable()
export class EventService extends BasicCrudService{

    constructor(
        @InjectRepository(EventEntity)
        private eventEntityRepository: Repository<EventService>,
    ) {
        super(eventEntityRepository)
    }


}
