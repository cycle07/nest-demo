/*
 * @Author: tianhong
 * @Date: 2022-11-21 16:32:57
 * @LastEditTime: 2022-11-21 16:47:08
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// 实现部分请求可以绕过鉴权响应
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
