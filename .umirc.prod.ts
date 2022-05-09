/*
 * @Author: sizhou
 * @Date: 2020-09-11 14:44:00
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-11 14:52:22
 */

import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    'process.env.ENV': 'prod',
    'process.env.BASE_URL': 'http://back.sizhouweb.cn',
  },
});
