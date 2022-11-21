/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-21 14:18:48
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-16 16:44:55
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';
// import Joi from '@hapi/joi'; // env验证

@Module({
  imports: [
    CoffeesModule,
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required,
    //     DATABASE_PORT: Joi.number().default(5432),
    //     DATABASE_USER: Joi.required,
    //     DATABASE_PASSWORD: Joi.required,
    //     DATABASE_NAME: Joi.required,
    //   }),
    // }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CoffeeRatingModule,
    DatabaseModule,
    // TypeOrmModule.forRootAsync({
    //   // 异步加载配置，不会因为环境变量还没有哦载入而报错
    //   useFactory: () => ({
    //     type: 'postgres',
    //     // host: '192.168.193.100',
    //     // host: '10.211.55.5',
    //     // port: 5432,
    //     // username: 'postgres',
    //     // password: 'pass123',
    //     // database: 'postgres',
    //     autoLoadEntities: true, // 生产环境不要开，自动加载@Entity()
    //     synchronize: true, // 生产环境不要开，自动同步表结构与数据
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // 生产环境不要开，自动加载@Entity()
      synchronize: true, // 生产环境不要开，自动同步表结构与数据
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule { }
