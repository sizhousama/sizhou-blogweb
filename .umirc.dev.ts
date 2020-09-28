/*
 * @Author: sizhou
 * @Date: 2020-09-11 14:43:35
 * @LastEditors: sizhou
 * @LastEditTime: 2020-09-11 14:49:02
 */

import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    "process.env.ENV": 'dev',
    "process.env.BASE_URL": 'http://127.0.0.1:7001'
  }
})
