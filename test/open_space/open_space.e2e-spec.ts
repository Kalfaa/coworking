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
import {ToolCreation, ToolType} from '../../src/tools/tool.dto';
import { ReservationModule } from '../../src/reservation/reservation.module';
import { ReservationCreation } from '../../src/reservation/reservation.dto';
import { RoomCreation } from '../../src/room/room.dto';
import { RoomModule } from '../../src/room/room.module';
import { addDays, addHours, addYears, subDays, subYears } from 'date-fns';
let now = new Date();
let token;
let userId;
let base = "openspace";
let id ;
let toolId;
let roomId;
let roomId2;
let idRes;
let idRes2;
let idRes3;
let toolId2;
describe("OpenSpace route", ()=>{
    beforeAll(async()=> {
    const module = await
    Test.createTestingModule({
        imports: [
            AuthModule,
            OpenSpaceModule,
            ReservationModule,
            RoomModule,
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
        description: 'description',
        tools:[],
            rooms:[]
      });
  });

  it('/ (Post) Add tool', async () => {
    let res = await  request(app.getHttpServer())
      .post('/'+base+'/'+id+'/addTool').set('Authorization', 'Bearer ' + token)
      .expect(400);
  });

  it('/ (Post) Add tool', async () => {
    let toolcreation:ToolCreation={name:"Imprimante",type:ToolType.PRINTER};
    let res = await  request(app.getHttpServer())
      .post('/'+base+'/'+id+'/addTool').send(toolcreation).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });

  it('/ (Post) Test tool has been added', async () => {
    let res = await  request(app.getHttpServer())
      .get('/'+base+'/'+id+'/getTools').set('Authorization', 'Bearer ' + token)
      .expect(200);
    toolId = res.body[0].id;
  });

  it('/ (Post) Test tool has been added', async () => {
    let res = await  request(app.getHttpServer())
      .get('/'+base+'/'+id).set('Authorization', 'Bearer ' + token)
      .expect(200).expect({
        id: id,
        name: 'Bastille',
        description: 'description',
        tools:[{ id: toolId, name: 'Imprimante',type:"PRINTER" }],
            rooms:[]
      });
  });

  it('/ (Post) Create room' , async () => {
    let room:RoomCreation = {name:"room Causy",description:"Une room causy",openSpace:id};
    let res = await  request(app.getHttpServer())
      .post('/room/').send(room).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });
  it('/ (Post) Get Room has been added', async () => {
    let res = await  request(app.getHttpServer())
      .get('/room/').set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(res.body.length).toBe(1);
  });


  it('/ (Post) Create second room' , async () => {
    let room:RoomCreation = {name:"room chill",description:"Une room chill",openSpace:id};
    let res = await  request(app.getHttpServer())
      .post('/room/').send(room).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });

  it('/ (Post) Get Room has been added', async () => {
    let res = await  request(app.getHttpServer())
      .get('/room/').set('Authorization', 'Bearer ' + token)
      .expect(200);
    roomId = res.body[0].id;
    roomId2 = res.body[1].id;
    expect(res.body.length).toBe(2);
  });



  it('/ (Post) Create room should fail' , async () => {
    let room:RoomCreation = {name:"room Causy",description:"Une room causy",openSpace:"ezea"};
    let res = await  request(app.getHttpServer())
      .post('/room/').send(room).set('Authorization', 'Bearer ' + token)
      .expect(404);
  });




  it('/ (Post) Reservation', async () => {
    let start = new Date(2018, 8, 22, 15, 0, 0);
    let end = new Date(2018, 8, 22, 16, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId,tools:[]};
    return await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });

  it('/ (Post) Reservation', async () => {
    let start = new Date(2018, 8, 22, 15, 0, 0);
    let end = new Date(2018, 8, 22, 16, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId2,tools:[]};
    return await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });


  it('/ (Post) Get Reservation should be created', async () => {
    let res = await  request(app.getHttpServer())
      .get('/reservation/').set('Authorization', 'Bearer ' + token)
      .expect(200);
    expect(res.body.length).toBe(2);
    idRes = res.body[0].id;
    idRes2 = res.body[1].id;
  });


  it('/ (Post) Get Reservation should nbe created', async () => {
    let res = await  request(app.getHttpServer())
      .post('/reservation/'+idRes+'/addTools').send({tools:[toolId]}).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });

  it('/ (Post) Get Reservation should nbe created', async () => {
    let res = await  request(app.getHttpServer())
      .post('/reservation/'+idRes+'/addTools').send({tools:[toolId]}).set('Authorization', 'Bearer ' + token)
      .expect(409);
  });


  it('/ (Post) Get Reservation should not be created', async () => {
    let res = await  request(app.getHttpServer())
      .post('/reservation/'+idRes2+'/addTools').send({tools:[toolId]}).set('Authorization', 'Bearer ' + token)
      .expect(409);
  });


  it('/ (Post) Reservation on the same moment should fail', async () => {
    let start = new Date(2018, 8, 22, 15, 0, 0);
    let end = new Date(2018, 8, 22, 15, 30, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId,tools:[]};
    return await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(409);
  });


  it('/ (Post) Reservation should be ok', async () => {
    let start = new Date(2018, 8, 22, 10, 0, 0);
    let end = new Date(2018, 8, 22, 11, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId,tools:[]};
    return await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(201);
  });


  it('/ (Post) Reservation should be ok', async () => {
    let start = new Date(2018, 8, 22, 11, 0, 0);
    let end = new Date(2018, 8, 22, 12, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId,tools:[toolId]};
    await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(201);
    let res = await  request(app.getHttpServer())
      .get('/reservation/').set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/ (Post) Reservation with tool should be Ko', async () => {
    let start = new Date(2018, 8, 22, 11, 0, 0);
    let end = new Date(2018, 8, 22, 12, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId2,tools:[toolId]};
    return await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(409);
  });


    it('/ (Post) Add tool', async () => {
        let toolcreation:ToolCreation={name:"Imprimante 2",type:ToolType.PRINTER};
        let res = await  request(app.getHttpServer())
            .post('/'+base+'/'+id+'/addTool').send(toolcreation).set('Authorization', 'Bearer ' + token)
            .expect(201);
        toolId2 = res.body.id;
    });


  it('/ (Post) Reservation with tool should be Ko', async () => {
    let start = new Date(2018, 8, 22, 12, 0, 0);
    let end = new Date(2018, 8, 22, 14, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId2,tools:[toolId,toolId2]};
    let res = await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(201);
    idRes3 = res.body.id ;

  });


  it('/ (Post) Reservation should be KO', async () => {
    let start = new Date(2018, 8, 22, 9, 0, 0);
    let end = new Date(2018, 8, 22, 12, 0, 0);
    let reservation:ReservationCreation = {start:start,end:   end,food:0,room:roomId,tools:[]};
    let res = await  request(app.getHttpServer())
      .post('/reservation/').send(reservation).set('Authorization', 'Bearer ' + token)
      .expect(409);
  });

    it('/ (Post) Get available', async () => {
        let date = new Date(2018, 8, 22, 9, 0, 0);
        let res = await  request(app.getHttpServer())
            .get('/reservation/available/'+id+"/"+date).set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.reservations.length).toBe(5);
    });




    it('/ (Post) Get Remove Tools', async () => {
        let res = await  request(app.getHttpServer())
            .post('/reservation/'+idRes3+'/removeTools').send({tools:[toolId]}).set('Authorization', 'Bearer ' + token)
            .expect(201);
    });

    it('/ (Post) Retry', async () => {
        let res = await  request(app.getHttpServer())
            .get('/reservation/'+idRes3).set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.tools.length).toBe(1);
    });
    /*
    it('/ (Post) Get Remove Tools 2', async () => {
        let res = await  request(app.getHttpServer())
            .post('/reservation/'+idRes3+'/removeTools').send({tools:[toolId2]}).set('Authorization', 'Bearer ' + token)
            .expect(201);
    });

    it('/ (Post) Retry 2' , async () => {
        let res = await  request(app.getHttpServer())
            .get('/reservation/'+idRes3).set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.tools.length).toBe(0);
    });*/
    it('/ (Post) Get Tool has been added 1', async () => {
        let res = await  request(app.getHttpServer())
            .get('/tool/').set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.length).toBe(2);
    });


    it('/ (Post) Get Room has been added 1', async () => {
        let res = await  request(app.getHttpServer())
            .get('/room/').set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.length).toBe(2);
    });

    it('/ (Post) Delete  2' , async () => {
        let res = await  request(app.getHttpServer())
            .delete('/reservation/'+idRes3).set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    it('/ (Post) Get Tool has been added 2', async () => {
        let res = await  request(app.getHttpServer())
            .get('/tool/').set('Authorization', 'Bearer ' + token)
            .expect(200);
        expect(res.body.length).toBe(2);
    });









    afterAll(async () => {
      await repository.query('DELETE FROM tools;');
      await repository.query('DELETE FROM reservations');
      await repository.query('DELETE FROM room;');
      await repository.query('DELETE FROM open_space;');
      await repository.query('DELETE FROM user;');
      await app.close();
    });

});