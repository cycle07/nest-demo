/*
 * @Author: tianhong
 * @Date: 2022-11-17 11:55:07
 * @LastEditTime: 2022-11-17 11:56:59
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
