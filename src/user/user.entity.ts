
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {UserRO} from "./user.dto";
import {BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: 'varchar',
        unique: true,
    })
    username: string;

    @Column('text')
    password: string;

    @Column('boolean',{
        default: false
    })
    isAdmin:boolean;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(): UserRO {
        return {id:this.id,created:this.created,username:this.username,isAdmin:this.isAdmin};
    }

    }