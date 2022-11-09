/*
 * @Author: tianhong
 * @Date: 2022-11-09 11:34:01
 * @LastEditTime: 2022-11-09 12:06:14
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
