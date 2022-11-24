/*
 * @Author: tianhong
 * @Date: 2022-11-09 14:34:59
 * @LastEditTime: 2022-11-24 19:02:56
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  // id: number; // id是自动生成的，不需要传入
  // readonly name: string; // 加readonly以防继承后该属性被修改
  // readonly brand: string;
  // readonly flavors: string[];
  @ApiProperty({
    description: '123123',
  })
  @IsString()
  readonly name: string; // 加readonly以防继承后该属性被修改

  @ApiProperty({
    description: '123123',
  })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: '123123',
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
