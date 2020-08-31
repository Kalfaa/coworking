import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import { OpenSpaceEntity } from './open_space.entity';
import { BasicCrudService } from '../basic_crud.service';
import { ToolService } from '../tools/tool.service';
import { ToolCreation } from '../tools/tool.dto';
import { ToolEntity } from '../tools/tool.entity';





@Injectable()
export class OpenSpaceService extends BasicCrudService{

  constructor(
    @InjectRepository(OpenSpaceEntity)
    private openSpaceEntityRepository: Repository<OpenSpaceService>,
  ) {
    super(openSpaceEntityRepository)
  }


  addTool(tool:ToolEntity) {

  }
}
