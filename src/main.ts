/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-09 19:53:17
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 数据结构白名单，过滤不在Dto上的字段
      forbidNonWhitelisted: true, // 如果出现了不在Dto上的字段，直接拦截
      transform: true, // 直接将数据转化为Dto实例 [body instance of CreateCoffeeDto === true] 可用query下string化的id重新转化为number
    }),
  );
  await app.listen(3000);
}
bootstrap();
