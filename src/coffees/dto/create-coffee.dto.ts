/*
 * @Author: tianhong
 * @Date: 2022-11-09 14:34:59
 * @LastEditTime: 2022-11-09 19:30:40
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { IsString } from 'class-validator';
export class CreateCoffeeDto {
  // id: number; // id是自动生成的，不需要传入
  // readonly name: string; // 加readonly以防继承后该属性被修改
  // readonly brand: string;
  // readonly flavors: string[];
  @IsString()
  readonly name: string; // 加readonly以防继承后该属性被修改

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
