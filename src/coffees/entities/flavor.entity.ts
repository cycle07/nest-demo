import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

/*
 * @Author: tianhong
 * @Date: 2022-11-08 17:46:46
 * @LastEditTime: 2022-11-10 19:35:08
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
@Entity()
export class Flavor {
  @PrimaryGeneratedColumn() // 主键装饰器
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
