# 简答题
## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
答：1> 初始化参数,根据用户在命令窗口输入的参数以及配置文件(webpack.config.js 文件)的配置参数,得到最后的配置参数。
   2> 开始编译,根据得到的参数初始化compiler对象,加载所有的配置插件,执行对象的run方法开始编译
   3> 确定入口,根据配置中的entry找出所有的入口文件
   4> 编译,从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
   5> 完成编译,递归结束后,得到每个文件结果,包含转换后的模块以及他们之间的依赖关系,根据 entry 以及 output 等配置生成代码块 chunk。
   6> 输出,在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
答：Loader是对指定的资源进行处理，将资源文件从输入到输出之间的一个转换，将资源文件转化为js模块
   Plugin拥有更宽的能力范围，Webpack要求插件必须是一个函数或者是一个包含apply方法的对象。通过在生命周期的钩子中挂载函数实现扩展。插件机制的是webpack一个核心特性，目的是为了增强webpack自动化方面的能力。
   开发 Loader 的思路：
   1,通过module.exports导出一个函数;
   2,该函数默认参数一个参数source(即要处理的资源文件)
   3,在函数体中处理资源(loader里配置响应的loader后)
   4,通过return返回最终打包后的结果(这里返回的结果需为字符串形式

   开发 Plugin 的思路：
   1,通过钩子机制实现
   2,插件必须是一个函数或包含apply方法的对象
   3,在方法体内通过webpack提供的API获取资源做响应处理
   4,将处理完的资源通过webpack提供的方法返回该资源

## 编程题
答：见code文件


## 笔记
### 模块化开发
CommonJS 规范：

1，一个文件就是一个模块
2，每个模块都有单独的作用域
3，通过 module.exports 导出成员
4，通过 require 函数载入模块
5，CommonJS 是以同步模式加载模块

早期：
AMD(Asynchronous Module Definition) --异步加载规范
推出了require.js这个库
1，define 函数，定义一个模块
2，require 函数，载入一个模块
3，目前绝大多数第三方库都支持 AMD 规范
4，AMD 使用起来相对复杂
5，模块 JS 文件请求频繁
同期出现（淘宝的库）：
Sea.js + CMD(Common Module Definition)

模块化标准规范：
在node.js 环境中，遵循 CommonJS 规范
在浏览器环境中，遵循 ES Modules 规范

ES Modules 基本特性：

1，自动采用严格模式，忽略 'use strict'
2，每个 ESM 模块都是单的私有作用域
3，ESM 是通过 CORS 去请求外部 JS 模块的
4，ESM 的 script 标签会延迟执行脚本

ES Modules 导出和导入：
export  是模块内对外暴露接口
import 是在模块内导入其他模块提供的接口

ES Modules 导出和导入注意事项：
export {} 这是一个固定的语法
import {} 这是一个固定的语法

export 注意有无 default 关键字
不能省略文件后缀名，不能省略 ./
执行某个模块，不需要提取模块中的成员 import './module.js'
动态导入模块，可以用全局函数 import()

为了ES module兼容，可以使用插件：
npm install browser-es-module-loader
<https://github.com/ModuleLoader/browser-es-module-loader>




ES Module 中可以导入 CommonJS 模块
CommonJS 中不能导入 ES Module 模块
CommonJS 始终只会导出一个默认成员
注意 import 不是解构导出对象

### webpack打包
 ---
 ### webpack配置文件
 entry: 这个属性是指webpack打包的入口路径
 output: 这个属性是设置输出文件的，要求是个对象，通过对象里面的filename来指定输出文件的名称，path来指定输出的路径
#### webpack 工作模式
mode: 'production',
mode: 'development',
mode: 'none',

#### 加载插件
要处理css文件，需要添加css-loader \ style-loader:
yarn add css-loader --dev
yarn add style-loader --dev

{
处理图片文件，添加 yarn add file-loader --dev
要修改文件的根目录，在output里面

解决字体图标，base64为图片，以及图片文件
url加载器：   yarn add url-loader --dev

最佳实践：

小文件使用 Data URLs，减少请求次数  yarn add url-loader --dev

大文件单独提取存放，提高加载速度  yarn add file-loader --dev

```

{
    test: /.png$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10 * 1024 // 10 KB
        }
    }
}

超出 10KB 文件单独提取存放                        file-loader
小于 10KB 文件转换为 Data URLS 嵌入代码中   url-loader
```

}



#### webpack 常用加载器分类:

* 编译转换类（css-loader => 以 JS 形式工作的我 CSS 模块）
* 文件操作类（file-loader => 导出文件访问路径）
* 代码检查类（eslint-loader => 检查通过/不通过）


#### ES6转换
配置转换loader：
yarn add babel-loader @babel/core @babel/preset-env --dev
同时在配置文件中：
```
{
    test: /.js$/,
    use: {
        loader: 'babel-loader'',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}
```

#### webpack 加载资源的方式


* 遵循 ES Modules 标准的 import 声明
* 遵循 CommonJS 标准的 require 函数
* 遵循 AMD 标准的 define 函数和 require 函数
*  样式代码中的 @import 执行和 url 函数
*  HTML 代码中图片标签的 src 属性

#### webpack 插件机制
* Loader 专注实现资源模块加载
* Plugin 解决其他自动化工作

#### Plugin用途
* 打包之前清除 dist 目录
* 拷贝静态文件至输出目录
* 压缩输出代码
常用插件

* clean-webpack-plugin 打包之前清除 dist 目录* html-webpack-plugin 用于生成 index.html 文件
* copy-webpack-plugin 拷贝静态文件至输出目录

#### Webpack Dev Serve
1， yearn add webpack-dev-serve --dev

#### Webpack Dev Server代理API（跨域问题解决方法）



#### Source Map

1，运行代码与源代码之间完全不同
2，如果需要调试应用，或者运行应用过程中出现了错误，错误信息无法定位
3，调试和报错都是基于运行代码Source Map
4，解决了源代码与运行代码不一致所产生的问题

在后面加一句：

//# sourceMappingURL=jquery-3.4.1.min.map

#### webpack配置Source Map

用devtool: '', 来配置

webpack 支持 12 种不同的 source-map 方式，每种方式的效率和效果各不相同

webpack devtool 模式对比
不同 devtool 之间的差异eval
* 是否使用 eval 执行模块代码cheap - Source Map
* 是否包含行信息module -
* 是否能够得到 Loader 处理之前的源代码


#### 选择合适的 Source Map
开发模式：cheap-module-eval-source-map


* 代码每行不会超过 80 个字符
* 代码经过 Loader 转换过后的差异较大
* 首次打包速度慢无所谓，重新打包速度较快


生产环境：none / nosources-source-map
* 安全隐患，source-map 会暴露源代码
* 调试是开发阶段的事情
* 没有绝对的选择，理解不同模式的差异，适配不同的环境


#### webpack自动刷新问题

HMR(Hot Module Replacement): 模块热替换

## ESLint

### ESLint 介绍
* 最为主流的 JavaScript Lint 工具，检测 JS 代码质量
* ESLint 很容易统一开发者的编码风格
* ESLint 可以帮助开发者提升编码能力
### ESLint 介绍
* 初始化项目（npm init --yes 初始化package.json），安装 ESLint 模块为开发依赖 npm install eslint -D
* 编写“问题”代码，使用 eslint 执行检测 npx eslint ./01-prepare.js 加上参数 --fix 可以自动修复格式问题
* 当代码中存在语法错误时，eslint 没法检查问题代码
* 完成 eslint 使用配置

### ESLint结合自动化工具
* 集成之后，ESLint 一定会工作
* 与项目统一，管理更加方便
* 结合 gulp 使用，过 .pipe(plugins.eslint()) 让其工作,通过 .pipe(plugins.eslint.format())和pipe(plugins.eslint.failAfterError())来检验

### ESLint 结合 Webpack
* Webpack 可以通过 loader 机制实现 eslint 的检测工作
* 安装 eslint eslint-loader
* 在 webpack.config.js 文件配置 eslint-loader 应用在 .js 文件中
* 安装相关插件，如：eslint-plugin-react --针对react项目
