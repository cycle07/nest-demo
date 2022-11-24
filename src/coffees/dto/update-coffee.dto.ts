/*
 * @Author: tianhong
 * @Date: 2022-11-09 19:20:33
 * @LastEditTime: 2022-11-24 19:00:58
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
// PartialType: 将另一个type中所有的属性都设置可选
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
// export class UpdateCoffeeDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavors?: string[];
// }
