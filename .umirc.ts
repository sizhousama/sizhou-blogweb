/*
 * @Author: sizhou
 * @Date: 2020-09-08 17:19:28
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-02 19:36:52
 */
import { defineConfig } from 'umi';

export default defineConfig({
  title: 'sizhouのweb',
  favicon: '/favicon.ico',
  routes: [
    { path: '/register', component: '../pages/Register/index' },
    { path: '/login', component: '../pages/Login/index' },
    { path: '/write/:id', component: '../pages/Write/index' },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', redirect: '/home', wrappers: ['../wrappers/auth'] },
        {
          path: '/home',
          component: '../pages/Home/index',
          wrappers: ['../wrappers/auth'],
        },
        {
          path: '/settings',
          component: '../pages/Settings/index',
          wrappers: ['../wrappers/auth'],
        },
        {
          path: '/userPage',
          component: '../pages/User/index',
          wrappers: ['../wrappers/auth'],
        },
        {
          path: '/drafts',
          component: '../pages/Draft/index',
          wrappers: ['../wrappers/auth'],
        },
        {
          path: '/article/:id',
          component: '../pages/Article/index',
          wrappers: ['../wrappers/auth'],
        },
      ],
    },
  ],
  hash: true,
  antd: {
    dark: false, // 开启暗色主题
  },
  theme: {
    'primary-color': '#000',
    'text-color-secondary': 'rgba(0, 0, 0, 0.2)',
    'border-radius-base': '4px', // 组件/浮层圆角
  },
  dva: {
    hmr: false,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
    title: false,
  },
  // 是否启用按需加载
  // dynamicImport: {},
  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },
  targets: {
    ie: 11,
  },
  mfsu: {},

  // proxy: {
  //   '/api': {
  //     target: 'http://128.1.1.1:8010/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
});
