/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-10-25 16:05:08
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('gift')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  getHello(): string {
    return this.appService.getHello();
  }
}
