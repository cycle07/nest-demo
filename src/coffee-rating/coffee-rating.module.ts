/*
 * @Author: tianhong
 * @Date: 2022-11-17 11:55:07
 * @LastEditTime: 2022-11-17 11:56:59
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
// import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    // DatabaseModule.register({
    //   type: 'postgres',
    //   // host: '192.168.193.100',
    //   host: '10.211.55.5',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'pass123',
    //   database: 'postgres',
    // }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
