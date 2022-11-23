/*
 * @Author: tianhong
 * @Date: 2022-11-23 11:28:54
 * @LastEditTime: 2022-11-23 11:38:09
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext) => {
    console.log('ProtocolDefaultValue', defaultValue);
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);
