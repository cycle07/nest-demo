/*
 * @Author: tianhong
 * @Date: 2022-11-23 10:23:53
 * @LastEditTime: 2022-11-23 10:31:29
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
