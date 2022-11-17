/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-17 11:28:22
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
/*
 * @Author: tianhong
 * @Date: 2022-10-25 15:40:42
 * @LastEditTime: 2022-11-16 16:44:55
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.193.100',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // 生产环境不要开，自动加载@Entity()
      synchronize: true, // 生产环境不要开，自动同步表结构与数据
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
