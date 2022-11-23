/*
 * @Author: tianhong
 * @Date: 2022-11-21 16:42:32
 * @LastEditTime: 2022-11-23 11:24:03
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // 指明哪个需要
    // consumer.apply(LoggingMiddleware).exclude('*'); // 指明哪个不需要
  }
}
