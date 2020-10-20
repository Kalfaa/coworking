import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class EventRO {
    id:string;
    name:string;
    image:string;
    description:string;
    date:Date;
}

export class EventDTO {
    name:string;
    image:string;
    description:string;
    openSpace:string;
    date:Date;
}

export class EventCreation {
    name:string;
    description:string;
    openSpace:string;
    date:Date;
}

export class FileDTO{
    @ApiProperty()
    @IsNotEmpty()
    file:any;

    @ApiProperty()
    @IsNotEmpty()
    path:any;
}