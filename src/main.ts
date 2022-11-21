/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-21 16:46:15
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
// import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new ApiKeyGuard()); // 全局使用带有reflector的实例会报错，API类不使用依赖注入才可以写在这里
  await app.listen(3000);
}
bootstrap();
