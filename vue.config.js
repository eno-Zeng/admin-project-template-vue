const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  productionSourceMap: true,
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
  },
  devServer: {
    proxy: 'https://www.baidu.com',
  },
});
