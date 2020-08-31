import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import { diskStorage } from  'multer';
import { ToolRO } from '../tools/tool.dto';
import { ToolService } from '../tools/tool.service';
import { ToolEntity } from '../tools/tool.entity';

@Controller('tool')
@ApiTags('Tool')
export class ToolController {
  constructor(private readonly toolService:ToolService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: ToolRO})
  async findById(@Param('id') id) {
    let openSpace:ToolEntity = await this.toolService.findOne(id,["openSpace"]);
    return openSpace.toResponseObject();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type: [ToolRO]})
  async findAll(@User() user) {
    let openSpaces =  await this.toolService.findAll(["openSpace"]);
    openSpaces.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, openSpaces);
    return openSpaces
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async delete(@Param('id') id) {
    return await this.toolService.delete(id);
  }


}
