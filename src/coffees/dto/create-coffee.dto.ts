/*
 * @Author: tianhong
 * @Date: 2022-11-09 14:34:59
 * @LastEditTime: 2022-11-09 14:39:50
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
export class CreateCoffeeDto {
  // id: number; // id是自动生成的，不需要传入
  name: string;
  brand: string;
  flavors: string[];
}
