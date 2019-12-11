const path = require('path');

module.exports = {
  // css: {
  //   loaderOptions: {
  //     // 适配
  //     postcss: {
  //       plugins: [
  //         require('postcss-pxtorem')({ // px转换为rem 需要npm i postcss-pxtorem -D
  //           rootValue: 100, // 换算的基数
  //           selectorBlackList: ['weui', 'mu'],
  //           propList: ['*'],
  //         }),
  //       ]
  //     },
  //     // 全局引入多个 scss 文件
  //     sass: {
  //       data: `
  //         @import "@/styles/variable.scss";
  //         @import "@/styles/mixins.scss";
  //       `,
  //     },
  //     // less 设置全局变量
  //     less: {
  //       globalVars: {
  //         primary: '#f38'
  //       }
  //     }
  //   },
  // },
  // 全局引入多个 scss 或 less 文件
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss', // or less
      patterns: [
        path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/mixins.scss'),
      ],
      // injector: 'append'
    },
  },
};
