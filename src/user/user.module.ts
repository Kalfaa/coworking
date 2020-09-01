
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {UserController} from "./user.controller";
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionModule } from '../subscription/subscription.module';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),SubscriptionModule],
    providers: [UserService],
    controllers:[UserController],
    exports: [UserService],
})
export class UserModule {}