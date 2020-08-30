import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import {AdminCreation, UserCreation, UserDTO, UserModif} from './user.dto';
import {UserLogin} from "../auth/auth.validation";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async login(data: UserLogin) {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }


    async register(data: UserCreation) {
        let user = await this.userRepository.findOne({where: { username: data.username }});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user ;
    }

    async registerAdmin(data: AdminCreation,psyRegister=false) {
        // TODOOO CREER LE PROFILE ICI
        const { username } = data;
        let user = await this.userRepository.findOne({where: { username }});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        if(!psyRegister) {
            await this.userRepository.save(user);
        }
        return user ;
    }

    async findOne(username: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({ where: { username } });
    }

    async findOneById(id: string): Promise<UserEntity | undefined> {
        return await this.userRepository.findOne({ where: { id } });
    }



    async update(userId:string,change:UserModif){
        let me = await this.userRepository.findOne({where:{id:userId}});
        await this.userRepository.update(userId, me);

    }

    async changePassword(userId:string,password:string){
        let me = await this.userRepository.findOne({where:{id:userId}});
        password = await bcrypt.hash(password, 10);
        me.password=password;
        return await this.userRepository.update(userId, me);
    }

    async delete(userID:string) {
        await this.userRepository.delete(userID);
    }


    async findByUserName(username:string) :Promise<UserEntity | undefined>{
        return await this.userRepository.findOne({where:{username:username}});
    }
}