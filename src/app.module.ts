import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { OpenSpaceModule } from './open_space/open_space.module';


@Module({
  imports: [TypeOrmModule.forRoot(),AuthModule,OpenSpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
