/*
 * @Author: tianhong
 * @Date: 2022-11-08 15:51:40
 * @LastEditTime: 2022-11-16 15:10:06
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
/*
 * @Author: tianhong
 * @Date: 2022-11-08 15:51:40
 * @LastEditTime: 2022-11-09 14:40:54
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  Delete,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get('flavors')
  findAll_v1(@Res() response) {
    // @Res是express的res处理
    // return 'This action return all coffees';
    response.status(200).send('This action return all coffees');
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // console.log('paginationQuery', paginationQuery);
    return this.coffeesService.findAll(paginationQuery);
    // return `This action return all coffees. limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee`;
  // }
  findOne(@Param('id') id: string) {
    // 如果应用其中某一个值，其他的值将不会被校验
    // return `This action returns #${id} coffee`;
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE) // 这个大概是Fastify的处理方式
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
    // return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
    // return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
    // return `This action removes #${id} coffee`;
  }
}
