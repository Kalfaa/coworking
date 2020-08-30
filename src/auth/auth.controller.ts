import {Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Param, Delete} from '@nestjs/common';

import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {AdminCreation, UserAndTokenResponse, UserCreation} from "../user/user.dto";
import {ApiCreatedResponse} from "@nestjs/swagger";
import {ChangePassword, CheckToken, ResetPassword, UserLogin} from "./auth.validation";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {User} from "../decorator/user.decorator";
import { TokenValidResponse} from "./auth.response";
import {EmailService} from "../email/email.service";
import {TokenUserEntity} from "../token_user/token_user.entity";
import {TokenUserService} from "../token_user/token_user.service";
import {UserEntity} from "../user/user.entity";
import 'dotenv/config';
import {AdminGuard} from "./admin.guard";


@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
                private authService: AuthService,
                private emailService:EmailService,
                private tokenUserService:TokenUserService
    ) {
        this._admincreation();
    }


    @ApiCreatedResponse({
        description: 'Users login.',
        type: UserAndTokenResponse,
    })
    @Post('login')
    async login(@Body() userLogin: UserLogin) {
        const user = await this.userService.login(userLogin);
        const token = await this.authService.login(user);
        return {user, token};
    }


    @Post('register')
    async register(@Body() userDTO: UserCreation) {
        if (userDTO.username === undefined || userDTO.password === undefined ||userDTO.email ===undefined ) {
            throw new HttpException('Missing argument password username or email', HttpStatus.BAD_REQUEST);
        }
        let user = await this.userService.register(userDTO);
    }

    @ApiCreatedResponse({
        description: 'Users login.',
        type: TokenValidResponse,
    })

    @UseGuards(JwtAuthGuard)
    @Get('is-token-valid')
    async isTokenValid(@User() user) {
        return {user: user, statusCode: 200}
    }


  async _admincreation(){
    let admin = await this.userService.findOneById("admin");

    if(!admin){
      let user = {id:"admin",username:process.env.ADMIN_USERNAME || "admin",password:process.env.ADMIN_PASSWORD || "admin",email:"admin@admin.fr",isAdmin:true};
      await this.userService.registerAdmin(user,false);
    }
  }


    @Post('resetPassword')
    async resetPassword(@Body() username:ResetPassword) {
        let email;
        let user:UserEntity =  await this.userService.findByUserName(username.username);
        if(!user){
            return true;
        }
        //TODO EMAIL
        let token:TokenUserEntity = await this.tokenUserService.create(user.id);
        return await this.emailService.sendEmail(email,token.token);
    }

    @Post('checkTokenReset')
    async checkResetUserToken(@Body() token:CheckToken ){
        let isTokenValid = await this.tokenUserService.isTokenValid(token.token);
        if(!isTokenValid){
            throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('changePassword')
    async changePassword(@Body() changePassword:ChangePassword){
        let isTokenValid = await this.tokenUserService.isTokenValid(changePassword.token);
        if(!isTokenValid){
            throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
        }
        await this.tokenUserService.delete(changePassword.token);
        return await this.userService.changePassword(isTokenValid.user.id,changePassword.newPassword)
    }

    @Post('createAdmin')
    @UseGuards(AdminGuard)
    @UseGuards(JwtAuthGuard)
    async adminCreation(@Body() userCreation:UserCreation ){
        let userAdmin:AdminCreation={username:"",isAdmin:true,password:"",email:userCreation.email};
        return await this.userService.registerAdmin(userAdmin)
    }

}