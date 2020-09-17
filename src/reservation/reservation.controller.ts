import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards,
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import { diskStorage } from  'multer';
import { ToolEntity } from '../tools/tool.entity';
import { AddTools, ReservationCreation, ReservationRO } from './reservation.dto';
import { ReservationService } from './reservation.service';
import { Between, Not } from 'typeorm';
import { ToolService } from '../tools/tool.service';
import { ReservationEntity } from './reservation.entity';

@Controller('reservation')
@ApiTags('Reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService,
              private readonly toolService: ToolService) {
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ReservationRO })
  async findById(@Param('id') id) {
    let openSpace: ReservationEntity = await this.reservationService.findOne(id, ["room", "tools"]);
    return openSpace.toResponseObject();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: [ReservationRO] })
  async findAll(@User() user) {
    let openSpaces = await this.reservationService.findAll(["room", "tools"]);
    openSpaces.forEach(function(part, index) {
      this[index] = part.toResponseObject();
    }, openSpaces);
    return openSpaces
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async delete(@Param('id') id) {
    return await this.reservationService.delete(id);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(@Body() reservationCreation: ReservationCreation) {

    reservationCreation.start = new Date(reservationCreation.start);
    reservationCreation.end = new Date(reservationCreation.end);
    reservationCreation.start.setMinutes(1);
    const between = Between(reservationCreation.start, reservationCreation.end);

    let reservationAllreadyDone = await this.reservationService.findSomeWithConditions([{
      start: between,
      room: reservationCreation.room
    }, { end: between, room: reservationCreation.room }], ["tools", "room"]);
    //console.log(reservationAllreadyDone);
    if (reservationAllreadyDone.length > 0) {
      throw new HttpException('This room is not available for the selectioned date', HttpStatus.CONFLICT)
    }
    let tools: any = [];
    let otherReservation: ReservationEntity[] = await this.reservationService.findSomeWithConditions([{ start: between }, { end: between }], ["tools", "room"]);
    if(this.isOverlapingToolReservation(reservationCreation.tools,otherReservation)){
      throw new HttpException('One of the tools is not available', HttpStatus.CONFLICT)
    }
    for (let i in reservationCreation.tools) {

      tools.push(await this.toolService.findOne(reservationCreation.tools[i]))
    }
    reservationCreation.tools = tools;
    return this.reservationService.create(reservationCreation);

  }

  @Post(':id/addTools')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({})
  async addTools(@Param('id') id , @Body() tools:AddTools) {
    let reservation: ReservationEntity = await this.reservationService.findOne(id, ["room", "tools"]);
    const between = Between(reservation.start, reservation.end);
    let idTools = this.arrayOfObjectToArrayOfId(reservation.tools);
    if(this.findCommonElement(tools.tools,idTools)){
      throw new HttpException('You already add this tool', HttpStatus.CONFLICT)
    }

    let otherReservation: ReservationEntity[] = await this.reservationService.findSomeWithConditions([{
      start: between,
      room: Not(reservation.room.id)
    }, { end: between, room: Not(reservation.room.id) }], ["tools", "room"]);
    console.log(otherReservation);
    if (this.isOverlapingToolReservation(tools.tools, otherReservation)) {
      throw new HttpException('One of the tools is not available', HttpStatus.CONFLICT)
    }

    for (let i in tools.tools) {
      reservation.tools.push(await this.toolService.findOne(tools.tools[i]))
    }

    return this.reservationService.update(reservation);

  }









  isOverlapingToolReservation(tools:string[], otherResevation:ReservationEntity[]) {
    let reservationTools = [];
    otherResevation.forEach(function(reservation) {
        reservation.tools.forEach(function(tool) {
            reservationTools.push(tool.id);
        })
    });
    return this.findCommonElement(reservationTools,tools);
  }

  arrayOfObjectToArrayOfId(array){
    let reservationTools = [];
      array.forEach(function(tool) {
        reservationTools.push(tool.id);
    });
    return reservationTools;
  }

  // Function definiton with passing two arrays
   findCommonElement(array1, array2) {

    // Loop for array1
    for(let i = 0; i < array1.length; i++) {

      // Loop for array2
      for(let j = 0; j < array2.length; j++) {

        // Compare the element of each and
        // every element from both of the
        // arrays
        if(array1[i] === array2[j]) {

          // Return if common element found
          return true;
        }
      }
    }

    // Return if no common element exist
    return false;
  }
}