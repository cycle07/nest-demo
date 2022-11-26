/*
 * @Author: tianhong
 * @Date: 2022-11-16 15:15:22
 * @LastEditTime: 2022-11-16 15:57:47
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type']) // 复合索引1
// @Index(['name', 'id'], { unique: true }) // 复合索引2
@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index() // 索引
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
