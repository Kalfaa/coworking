import {INestApplication, ValidationPipe} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as request from 'supertest';
import {AuthModule} from "../../src/auth/auth.module";
import {Repository} from "typeorm";
let app: INestApplication;
let repository: Repository<UserEntity>;
import 'dotenv/config';
import {UserEntity} from "../../src/user/user.entity";
import { OpenSpaceModule } from '../../src/open_space/open_space.module';
import { OpenSpaceCreation } from '../../src/open_space/open_space.dto';
import { ToolCreation } from '../../src/tools/tool.dto';
import { UserModule } from '../../src/user/user.module';
import { AddSubscription, SubscriptionType } from '../../src/user/user.dto';
let token;
var userId;
let base = "user";
describe("User route", ()=>{
    beforeAll(async()=> {
    const module = await
    Test.createTestingModule({
        imports: [
            AuthModule,
            UserModule,
            // Use the e2e_test database to run the tests
            TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.NEST_HOST,
                username: process.env.TEST_USERNAME,
                password: process.env.TEST_PASSWORD || '',
                synchronize: true,
                logging: false,
                entities: ["src/**/*.entity.ts"],
                port: parseInt(process.env.TEST_PORT),
                database: process.env.TEST_DATABASE,
            }),
        ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    repository = module.get('UserEntityRepository');
      await request(app.getHttpServer()).post('/auth/register').send({username:"pabla",password:"escobar",isPsy:false ,email:"hello@hello.fr"});
      let result = await request(app.getHttpServer()).post('/auth/login').send({username:"pabla",password:"escobar"});
      token = result.body.token.access_token;
      userId = result.body.user.id;
      console.log(userId);
    });


  it('/ (Post) Add subscription shoudl fail', () => {
    return request(app.getHttpServer())
      .post('/'+base+'/addSubscription').send().set('Authorization', 'Bearer ' + token)
      .expect(400)
  });


  it('/ (Post) Add subscription', () => {
    let subscription:AddSubscription={month:2,subscriptionType:SubscriptionType.SIMPLE};
    return request(app.getHttpServer())
      .post('/'+base+'/addSubscription').send(subscription).set('Authorization', 'Bearer ' + token)
      .expect(201)
  });
  

  it('/ (Post) Get user should find subscription', () => {
    console.log(userId);
    return request(app.getHttpServer())
      .get('/'+base+'/'+userId).send().set('Authorization', 'Bearer ' + token)
      .expect(200)
  });

  afterAll(async () => {
        await repository.query('DELETE FROM subscription;');
        await repository.query('DELETE FROM user;');
        await app.close();
    });

});