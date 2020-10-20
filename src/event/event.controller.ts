import {ApiConsumes, ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
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
import {EventService} from "./event.service";
import {EventEntity} from "./event.entity";
import {extname} from "path";
import {FileInterceptor} from "@nestjs/platform-express";
import {EventCreation, EventDTO, EventRO, FileDTO} from "./event.dto";


export const localStorageFileInterceptor = (fileName: string) => FileInterceptor(fileName,
    {
        storage: diskStorage({
            destination: './image',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => (Math.round(Math.random() * 16)).toString(16))
                    .join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    });


@Controller('event')
@ApiTags('event')
export class EventController {
    constructor(private readonly eventService:EventService) {}


    @Get('file/:fileName')
    async serveFile(@Param('fileName') fileName, @Res() res): Promise<any> {
        res.sendFile(fileName, { root:  './image' });
    }

    @Get('/openSpace/:id')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: [EventRO]})
    async findForOpenSpace(@Param('id') id) {
        let events =  await this.eventService.findAll(["openSpace"]);
        events.forEach(function(part, index) {
            console.log(part);
                this[index] = part.toResponseObject();

        }, events);
        return events
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: EventRO})
    async findById(@Param('id') id) {
        let event:EventEntity = await this.eventService.findOne(id);
        return event.toResponseObject();
    }

    @Post()
    @UseInterceptors(localStorageFileInterceptor('file'))
    async create(@UploadedFile() file,@Body() event:EventCreation){
        let filepath ='';
        console.log(file);
        if(file!==undefined){
            filepath=file.filename;
        }
        let eventDto:EventDTO = {name:event.name,image:filepath,description:event.description,openSpace:event.openSpace,date:event.date};
        return this.eventService.create(eventDto);
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: [EventRO]})
    async findAll(@User() user) {
        let events =  await this.eventService.findAll(["openSpace"]);
        events.forEach(function(part, index) {
            this[index] = part.toResponseObject();
        }, events);
        return events
    }




    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({})
    async delete(@Param('id') id) {
        return await this.eventService.delete(id);
    }

}
