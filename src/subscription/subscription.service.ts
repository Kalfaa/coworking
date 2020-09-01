import { AddSubscription } from '../user/user.dto';
import { BasicCrudService } from '../basic_crud.service';
import { ToolEntity } from '../tools/tool.entity';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';
import {InjectRepository} from "@nestjs/typeorm";

export class SubscriptionService extends BasicCrudService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionEntityRepository: Repository<SubscriptionService>
  ) {
    super(subscriptionEntityRepository)
  }
}