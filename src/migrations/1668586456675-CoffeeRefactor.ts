/*
 * @Author: tianhong
 * @Date: 2022-11-16 16:14:16
 * @LastEditTime: 2022-11-16 16:31:25
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1668586456675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 定义去修改啥
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // 定义去如何回滚
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        );
    }
}
