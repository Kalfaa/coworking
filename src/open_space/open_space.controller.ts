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
import { ToolCreation } from '../tools/tool.dto';
import { ToolService } from '../tools/tool.service';
@Controller('openspace')
@ApiTags('OpenSpace')
export class OpenSpaceController {
  constructor(private readonly openSpaceService: OpenSpaceService,
              private readonly toolService:ToolService) {}


  @Post(':id/addTool/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async addTool(@Param('id') id,@Body() toolCreation:ToolCreation) {
     let tool = {name:toolCreation.name,openSpace:id};
     return await this.toolService.create(tool);
  }

  @Get(':id/getTools/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async getTools(@Param('id') id) {
    return await this.toolService.findSomeWithConditions({openSpace:id});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: OpenSpaceRO})
  async findById(@Param('id') id) {
    let openSpace:OpenSpaceEntity = await this.openSpaceService.findOne(id,["tools"]);
    return openSpace.toResponseObject();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: [OpenSpaceRO]})
  async findAll(@User() user) {
    let openSpaces =  await this.openSpaceService.findAll(["tools"]);
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
  async delete(@Param('id') id) {
    return await this.openSpaceService.delete(id);
  }


}
