/*
 * @Author: tianhong
 * @Date: 2022-11-08 16:43:45
 * @LastEditTime: 2022-11-17 15:39:35
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import {
  HttpException,
  Injectable,
  HttpStatus,
  NotFoundException,
  Inject,
  Scope,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Events } from '../events/entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
// @Injectable({ scope: Scope.DEFAULT }) // 全局只实例化一次
// @Injectable({ scope: Scope.TRANSIENT }) // 用一次实例化一次
@Injectable({ scope: Scope.REQUEST }) // 一次请求实例化一次，请求完就GC，初始化共用一个实例，本质上注册到了上游controller的构造函数中，使用这个scope会额外获得一个Request信息，包含请求的请求头，Cookie，ip，但这个操作会消耗性能
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>, // ctx.dbInstance

    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>, // ctx.dbInstance

    private readonly connection: DataSource, // typeorm v3

    // @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    // @Inject(coffeesConfig.KEY)
    // private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,

    private readonly configService: ConfigService,
  ) {
    // console.log(coffeeBrands);
    // console.log('env', this.configService.get('database.host'));
    // console.log('coffees', this.coffeesConfiguration);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); // errMsg: string, errCode: number
      // throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    }); // preload === insert on duplicate key update
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND); // errMsg: string, errCode: number
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;

      const recommendEvent = new Events();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
