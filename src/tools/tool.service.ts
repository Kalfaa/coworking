import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { BasicCrudService } from '../basic_crud.service';
import { ToolEntity } from './tool.entity';





@Injectable()
export class ToolService extends BasicCrudService {

  constructor(
    @InjectRepository(ToolEntity)
    private toolEntityRepository: Repository<ToolService>
  ) {
    super(toolEntityRepository)
  }

}