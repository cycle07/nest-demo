/*
 * @Author: tianhong
 * @Date: 2022-11-23 11:18:17
 * @LastEditTime: 2022-11-23 11:25:58
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('hi from middleware!');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
