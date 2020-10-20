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
import {OpenHours, OpenSpaceCreation, OpenSpaceRO} from './open_space.dto';
import { ToolCreation } from '../tools/tool.dto';
import { ToolService } from '../tools/tool.service';
import {OpenHoursEntity} from "../open-hours/open-hours.entity";
@Controller('openspace')
@ApiTags('OpenSpace')
export class OpenSpaceController {
  constructor(private readonly openSpaceService: OpenSpaceService,
              private readonly toolService:ToolService) {}


  @Post(':id/addTool/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async addTool(@Param('id') id,@Body() toolCreation:ToolCreation) {
     let tool = {name:toolCreation.name,openSpace:id,type:toolCreation.type};
     return await this.toolService.create(tool);
  }

    @Post(':id/changeHours/')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({})
    async changeHours(@Param('id') id,@Body() openHours:OpenHours) {
        let openSpace:OpenSpaceEntity = await this.openSpaceService.findOne(id,["tools","rooms"]);
        openSpace.openHours = this.openHourToEntity(openHours);
        return await this.openSpaceService.update(openSpace);
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
    let openSpace:OpenSpaceEntity = await this.openSpaceService.findOne(id,["tools","rooms"]);
    return openSpace.toResponseObject();
  }

  @Get('')
  @ApiCreatedResponse({type: [OpenSpaceRO]})
  async findAll() {
    let openSpaces =  await this.openSpaceService.findAll(["tools","rooms","events"]);
    openSpaces.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, openSpaces);
    return openSpaces
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async create(@Body() openSpace:OpenSpaceCreation) {
    if(!openSpace.openHours){
        openSpace.openHours = this.getDefaultOpenHours();
    }
    return await this.openSpaceService.create(openSpace);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async delete(@Param('id') id) {
    return await this.openSpaceService.delete(id);
  }

  getDefaultOpenHours(){
    let openHour: any = new OpenHoursEntity();
    openHour.monday= { start:9 ,end:22};
    openHour.tuesday= { start:9 ,end:22};
    openHour.wednesday= { start:9 ,end:22};
    openHour.thursday= { start:9 ,end:22};
    openHour.friday= { start:9 ,end:22};
    openHour.saturday= { start:9 ,end:22};
    openHour.sunday= { start:9 ,end:22};
    return openHour;
  }

  openHourToEntity(openHour:OpenHours){
      let openHourEntity: any = new OpenHoursEntity();
      openHourEntity.monday= openHour.monday;
      openHourEntity.tuesday= openHour.tuesday;
      openHourEntity.wednesday= openHour.wednesday;
      openHourEntity.thursday= openHour.thursday;
      openHourEntity.friday= openHour.friday;
      openHourEntity.saturday= openHour.saturday;
      openHourEntity.sunday= openHour.sunday;
      return openHourEntity;
  }
}
