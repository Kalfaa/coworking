import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import { diskStorage } from  'multer';
import { ToolCreation } from '../tools/tool.dto';
import { ToolService } from '../tools/tool.service';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { RoomCreation, RoomRO } from './room.dto';
import { OpenSpaceService } from '../open_space/open_space.service';
@Controller('room')
@ApiTags('Room')
export class RoomController{
  constructor(private readonly roomService: RoomService,
              private readonly openSpaceService:OpenSpaceService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: RoomRO})
  async findById(@Param('id') id) {
    let openSpace:RoomEntity = await this.roomService.findOne(id,["openSpace"]);
    return openSpace.toResponseObject();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: [RoomRO]})
  async findAll(@User() user) {
    let openSpaces =  await this.roomService.findAll(["openSpace"]);
    openSpaces.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, openSpaces);
    return openSpaces
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async create(@Body() room:RoomCreation) {
      await this.openSpaceService.findOne(room.openSpace);
      return await this.roomService.create(room);
  }




  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async delete(@Param('id') id) {
    return await this.roomService.delete(id);
  }


}
