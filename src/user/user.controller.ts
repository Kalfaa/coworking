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

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    /*
    @UseGuards(JwtAuthGuard)
    @Patch('')
    @HttpCode(204)
    async update(@User() user,@Body() patientDto:UserModif)
    {
        return await this.userService.update(user.userId,patientDto);
    }*/
      @UseGuards(JwtAuthGuard)
      @Post('')
      @HttpCode(204)
      async addSubscription(@User() user,@Body() addSubscription:AddSubscription)
      {
        return await this.userService.addSubscription(user.userId,addSubscription);
      }
}
