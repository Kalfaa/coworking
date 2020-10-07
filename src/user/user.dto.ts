import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {SubscriptionEntity} from "../subscription/subscription.entity";

export enum SubscriptionType {
  SIMPLE = "SIMPLE",
  RESIDENT = "RESIDENT",
  NONE="NONE"
}


export class UserDTO {
    id:string;
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

}

export class AdminCreation{
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password:string;

    @ApiPropertyOptional()
    @IsEmail()
    email:string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    isAdmin:boolean;
}

export class UserCreation {
    id:string;
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional()
    @IsEmail()
    email:string;

}

export class UserRO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    created: Date;
    @ApiPropertyOptional()
    isAdmin:boolean;
    @ApiPropertyOptional()
    subscription:any;
}

export class Token {
    @ApiProperty()
    access_token: string;
}


export class UserModif {
    @ApiProperty()
    skin: string;
}
export class UserAndTokenResponse {
    @ApiProperty()
    user:UserRO;
    @ApiProperty()
    token:Token;
}

export class addXp {
    @ApiProperty()
    xp: number;
}

export class AddSubscription {
  @IsNotEmpty()
  subscriptionType:SubscriptionType;
  @IsNotEmpty()
  month:number;
}