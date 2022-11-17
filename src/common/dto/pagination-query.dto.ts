// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

/*
 * @Author: tianhong
 * @Date: 2022-11-16 14:49:45
 * @LastEditTime: 2022-11-16 15:02:16
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
export class PaginationQueryDto {
  @IsOptional() // 缺失或者不定义不会抛出异常
  @IsPositive() // number是否为正数
  // @Type(() => Number) // query string自动转成number
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
