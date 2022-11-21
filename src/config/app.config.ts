/*
 * @Author: tianhong
 * @Date: 2022-11-21 10:39:51
 * @LastEditTime: 2022-11-21 14:30:56
 * @LastEditors: tianhong
 * @Description: Describe the function of this file
 */
export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: '10.211.55.5',
    port: 5432,
  },
});
