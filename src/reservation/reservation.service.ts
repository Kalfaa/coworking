import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { BasicCrudService } from '../basic_crud.service';
import { ReservationEntity } from './reservation.entity';





@Injectable()
export class ReservationService extends BasicCrudService {

  constructor(
    @InjectRepository(ReservationEntity)
    private reservationEntityRepository: Repository<ReservationService>
  ) {
    super(reservationEntityRepository)
  }

}

