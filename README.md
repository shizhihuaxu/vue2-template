## 一、技术选型

基础：vue-cli 3 + vue + SCSS + ES6 

UI 库：view-design (iview 4.0)

请求：Axios

路由：Vue Router

状态管理：vuex

单元测试：Jest

代码检查：ESLint

Commit 工具：commitizen + cz-conventional-changelog（Angular）

## 二、项目构建

### 2.1  使用 vue-cli 3 初始化项目

1.  若之前使用的是 vue-cli 2 

   ```bash
   npm uninstall -g vue-cli # 卸载
   ```

2.  安装 cli 3

   ```bash
   npm install -g @vue/cli
   vue -V # 查看是否安装成功
   ```

3.  初始化项目

   ```bash
   vue create project_name
   ```

   选择 Babel  + Router + Vuex + CSS Pre-processors (node-sass) + Lint (on save) + Airbnb + Jest

### 2.2  使用 view-design(iview 4)

1.  在create 后执行，vue add ivew，这一步骤会重写所有更改，所以最好在 create 后立即执行，避免更改被覆盖；或执行 vue ui 在 可视化管理界面搜索 iview 插件 添加

2. 可选按需引入，可能会出现如下错误，是 eslint 的代码检查不推荐添加扩展名，去掉 js 扩展名即可

   > Unexpected use of file extension "js" for import './plugins/iview.js';

### 2.3  less 、scss、postcss 配置 demo

1.  在根目录下添加 vue.config.js

   ```javascript
   const path = require('path')
   
   module.exports = {
     css: {
       loaderOptions: {
         // 适配
         postcss: {
           plugins: [
             require('postcss-pxtorem')({ // px转换为rem 需要npm i postcss-pxtorem -D
               rootValue: 100, // 换算的基数
               selectorBlackList: ['weui', 'mu'],
               propList: ['*'],
             }),
           ]
         },
         // 全局引入多个 scss 文件
         sass: {
           data: `
             @import "@/styles/variable.scss";
             @import "@/styles/mixins.scss";
           `,
         },
         // less 设置全局变量
         less: {
           globalVars: {
             primary: '#f38'
           }
         }
       },
     },
     // 全局引入多个 scss 或 less 文件
     pluginOptions: {
       'style-resources-loader': {
         preProcessor: 'scss', // or less
         'patterns': [
           path.resolve(__dirname, './src/styles/mixins.scss'),
         ],
         //injector: 'append'
       }
     }
   };
   
   ```

### 2.4  更改 webpack 的其它配置

1.  添加新的扩展名,

   ```javascript
   module.exports = {
     configureWebpack: {
       resolve: {
         extensions: ['.js', '.vue', '.json'],
       },
     },
   }
   ```

### 2.5  全局注册通用组件

1.  通用组件全部放在 components/common 文件夹下，（不同模块使用不同的文件夹分离），然后在common/index.js 中添加

   ```
   import HelloWorld from './common/HelloWorld.vue';
   
   const globalComponents = {
     install(Vue) {
       Vue.component('HelloWorld', HelloWorld);
     },
   };
   
   export default globalComponents;
   
   ```

   在 main.js 引入

   ```
   import globalComponents from './components';
   // 将组件注册为全局组件
   Vue.use(globalComponents);
   ```

### 2.5 使用 axios

1.  安装依赖

   ```
   cnpm install -S axios qs
   ```

   

## 三、团队规范

### 3.1  使用 [commitizen](https://github.com/commitizen/cz-cli) 写 commit message

1.  全局安装 commitizen，以及生成 changelog 的工具

   ```bash
   cnpm install -g commitizen conventional-changelog-cli
   ```

2.  然后使用 cz-conventional-changelog 初始化项目，需要node >=10, npm >=6, 你也可以使用其它的adapter。

   ```bash
   commitizen init cz-conventional-changelog --save --save-exact
   ```

### 3.2  命名规则

1.   js mixins，文件名小写 + 连接符

   全局 mixins 放在 scripts/mixins/common-mixins.js 中

   ```
   $_commonMixins_handleResStatus  // 以 $_commonMixins_为前缀
   ```

   以模块划分的 mixins 需以模块名作为前缀

2. 

