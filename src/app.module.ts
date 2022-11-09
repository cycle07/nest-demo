/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-09 12:07:17
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
