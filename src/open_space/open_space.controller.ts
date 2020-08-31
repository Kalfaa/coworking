import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import { diskStorage } from  'multer';
import { OpenSpaceEntity } from './open_space.entity';
import { OpenSpaceService } from './open_space.service';
import { OpenSpaceCreation, OpenSpaceRO } from './open_space.dto';

const { getAudioDurationInSeconds } = require('get-audio-duration');

@Controller('openspace')
@ApiTags('OpenSpace')
export class OpenSpaceController {
  constructor(private readonly openSpaceService: OpenSpaceService) {}

  /*
  @Post(':playlistId/addMusic/:idMusic')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async addMusic(@Param('playlistId') playlistId,@Param('idMusic') musicId,@User() user) {
    return await this.playlistService.addMusic(playlistId,musicId,user.userId);
  }*/

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: OpenSpaceEntity})
  async findById(@Param('id') id) {
    let openSpace:OpenSpaceEntity = await this.openSpaceService.findOne(id);
    return openSpace.toResponseObject();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: [OpenSpaceRO]})
  async findAll(@User() user) {
    /*users.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, users);*/
    let openSpaces =  await this.openSpaceService.findAll();
    openSpaces.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, openSpaces);
    return openSpaces
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async create(@Body() openSpace:OpenSpaceCreation) {
    return await this.openSpaceService.create(openSpace);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async deleteMusic(@Param('id') id) {
    return await this.openSpaceService.delete(id);
  }


}
