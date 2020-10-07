import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete, UseGuards, HttpCode,
} from '@nestjs/common';

import {UserService} from "./user.service";
import { AddSubscription, addXp, UserDTO, UserModif } from './user.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import {ApiTags} from "@nestjs/swagger";
import { SubscriptionService } from '../subscription/subscription.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly subscriptionService: SubscriptionService ) {}
    /*
    @UseGuards(JwtAuthGuard)
    @Patch('')
    @HttpCode(204)
    async update(@User() user,@Body() patientDto:UserModif)
    {
        return await this.userService.update(user.userId,patientDto);
    }*/
      @UseGuards(JwtAuthGuard)
      @Post('addSubscription')
      async addSubscription(@User() user,@Body() addSubscription:AddSubscription)
      {
        let now = new Date();
        let sub = await this.subscriptionService.findOneWithConditions({user:{id:user.userId}});
        if(sub){
            await this.subscriptionService.delete(sub.id);
        }
        let endOfSubscription = new Date(now.setMonth(now.getMonth()+addSubscription.month));
        let createSubscription = {user:user.userId,end:endOfSubscription,type:addSubscription.subscriptionType};
        console.log(createSubscription);
        return await this.subscriptionService.create(createSubscription);
      }

      @UseGuards(JwtAuthGuard)
      @Get('')
      async read()
      {
        return await this.userService.findAll(['subscription']);
      }

      @UseGuards(JwtAuthGuard)
      @Get(':id')
      async findById(@Param('id') id)
      {
        //TODO PROBLEM AVEC LES CONDITIONS
        return await this.userService.findOneWithConditions({id:id},['subscription']);
      }

}
