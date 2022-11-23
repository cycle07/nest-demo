/*
 * @Author: tianhong
 * @Date: 2022-11-23 09:48:49
 * @LastEditTime: 2022-11-23 10:04:21
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // intercept方法包装了路由，允许在执行最终路由处理程序之前和之后实现自定义逻辑
    // return next.handle().pipe(tap((data) => console.log('After...', data))); // 如果handle没有被调用，原路由的默认方法将不会被执行
    return next.handle().pipe(map((data) => ({ data })));
  }
}
