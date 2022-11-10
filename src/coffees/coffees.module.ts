/*
 * @Author: tianhong
 * @Date: 2022-11-09 11:34:01
 * @LastEditTime: 2022-11-10 19:38:04
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
