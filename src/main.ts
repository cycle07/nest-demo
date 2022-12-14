/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-24 18:52:54
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TimeoutInterceptor } from './common/intercepter/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from './common/intercepter/wrap-response/wrap-response.interceptor';
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
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Ilucoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
