
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './subscription.entity';



@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [SubscriptionService],
  controllers:[],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}