import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '10.211.55.5',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true, // 生产环境不要开，自动加载@Entity()
          synchronize: true, // 生产环境不要开，自动同步表结构与数据
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 数据结构白名单，过滤不在Dto上的字段
        forbidNonWhitelisted: true, // 如果出现了不在Dto上的字段，直接拦截
        transform: true, // 直接将数据转化为Dto实例 [body instance of CreateCoffeeDto === true] 可用query下string化的id重新转化为number
        transformOptions: {
          enableImplicitConversion: true, // 全局隐式转换，代替@Type
        },
      }),
    );

    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .set('Authorization', '8eh38hfwdfsdfhfh8hf834fh83')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      // .then(({ body }) => {
      //   // jasmine这个好像不维护了
      //   const expectedCoffee = jasmine.objectContaining({
      //     ...coffee,
      //     flavors: jasmine.arrayContaining(
      //       coffee.flavors.map((name) => jasmine.objectContaining({ name })),
      //     ),
      //   });
      //   expect(body).toEqual(expectedCoffee);
      // });
  });
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
