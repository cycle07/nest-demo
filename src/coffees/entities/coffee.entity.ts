import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

/*
 * @Author: tianhong
 * @Date: 2022-11-08 17:46:46
 * @LastEditTime: 2022-11-10 19:37:25
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
@Entity() // 每一个Entity代表一个SQL表 sql table === coffee[类的小写]
export class Coffee {
  @PrimaryGeneratedColumn() // 主键装饰器
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column('json', { nullable: true }) // 该字段可为空
  @JoinTable() // 表示要用外键了
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees) // 第一个参数指向连接哪个Entity，第二个参数表示数组子项对应链接的Entity中哪个值，对端也要设置，才能建立连接
  flavors: string[];
}
