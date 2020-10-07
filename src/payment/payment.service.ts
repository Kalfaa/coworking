import {InjectRepository} from "@nestjs/typeorm";
import {BasicCrudService} from "../basic_crud.service";
import {Repository} from "typeorm";
import {PaymentEntity} from "./payment.entity";


export class PaymentService extends BasicCrudService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentService>
  ) {
    super(paymentRepository)
  }
}