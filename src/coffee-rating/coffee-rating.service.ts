/*
 * @Author: tianhong
 * @Date: 2022-11-17 11:55:46
 * @LastEditTime: 2022-11-17 11:57:48
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
