/*
 * @Author: tianhong
 * @Date: 2022-11-16 16:01:04
 * @LastEditTime: 2022-11-16 17:55:24
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: '192.168.193.100',
  port: 5433,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*..js'],
});

export default AppDataSource;
