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
let token;
let userId;
let base = "openspace";
let id ;
describe("OpenSpace route", ()=>{
    beforeAll(async()=> {
    const module = await
    Test.createTestingModule({
        imports: [
            AuthModule,
            OpenSpaceModule,
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
    });


  it('/ (Post) Create openspace should fail', () => {
    return request(app.getHttpServer())
      .post('/'+base+'/').send().set('Authorization', 'Bearer ' + token)
      .expect(400)
  });

  it('/ (Post) Create openspace should be ok ', () => {
      let openspacecreation:OpenSpaceCreation = {name:"Bastille",description:"description"} ;
    return request(app.getHttpServer())
      .post('/'+base+'/').send(openspacecreation).set('Authorization', 'Bearer ' + token)
      .expect(201)
  });

  it('/ (Post) Get openspace should return len 1', async () => {
    let res = await  request(app.getHttpServer())
      .get('/'+base+'/').set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(res.body.length).toBe(1);
    id = res.body[0].id;
  });

  it('/ (Post) Get openspace should return len 1', async () => {
    let res = await  request(app.getHttpServer())
      .get('/'+base+'/'+id).set('Authorization', 'Bearer ' + token)
      .expect(200).expect({
        id: id,
        name: 'Bastille',
        description: 'description'
      });
  });

    afterAll(async () => {
        await repository.query('DELETE FROM open_space;');
        await repository.query('DELETE FROM user;');
        await app.close();
    });

});