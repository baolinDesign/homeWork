# 简答题
## 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
答：前端工程化是指遵循一定的标准和规范，通过工具提高效率来降低成本的一种手段，我认为可以从四方面去讨论，模块化，组件化，规范化和自动化
模块化：将大的文件拆分成互相依赖的小文件，再进行统一的拼装和加载。比如；js模块化，css模块化
组件化：将UI页面拆分为模板+样式+逻辑组成的功能单元，称为组件，模块化是在资源和代码
方面对文件的拆分，而组件化是在UI层面进行的拆分。
规范化：如，项目目录规范化，编码规范化，前后端接口规范化，git分支管理，commit描述规范，组件管理等编码规范化分为html
css js img 命名规范这几类 接口规范，这样做是为了减少联调中不必要的问题和麻烦，同时提高代码的质量和效率
自动化：让简单重复的工作交给机器完成，如自动化测试，自动化部署，自动化构建，持续继承等


他主要解决了:
a,传统语言或语法的弊端，比如，es6的新特性、css3的浏览器兼容效果
b,无法直接使用模块化和组件化这种方式进行编程
c,在日常开发中有大量的重复工作，如，每个项目都要的css、img、js文件夹等
d,难以统一各个开发人员的开发风格以及对仓库代码的质量保证
e,在整个前端开发过程中，对后端的依赖很严重，比如在部署的时候需要把项目打包放到后端项目中
在创建项目过程中，使用脚手架工具自动搭建基础结构的搭建
在编码环节，可以借助工程化的工具自动帮我们代码格式化、以及代码风格的校验、和代码的编译构建和打包
在预览环节，可以借助现代化的webserver来提供热更新的服务，
在提交阶段，可以用类似git hooks来做项目的整体检查
在部署阶段，可以用一行命令来代替传统的ftp上传，还可以持续集成的方式持续部署到我们的服务器，避免手动操作产生的失误

<br/>

## 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
答：脚手架也为我们提供了项目规范和公共约定。包括相同的组织结构、相同的代码开发范式、相同的模块依赖、相同的工具配置、相同的基础代码等等。对于公司里的大多数项目，前端都可以使用同一套脚手架，不仅可以统一各个项目，当项目成员切换团队时，也可以直接上手，提高效率，相关模块依赖更新或者配置需要改动时，可以一步到位更新所有产品，更利于维护。

<br/>

# 编程题
1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
答：通过命令行交互的形式询问使用者，从而得到结果，再结合一些模板文件，最后生成项目结构目录
~使用NodeJS开发一个小型的脚手架工具：
* 创建文件夹 baolin-proj
* 文件夹初始化
```
yarn init
```
* 安装所需依赖
```
yarn add inquirer
```
* 在package.json中添加 bin属性指定脚手架的命令入口文件为cli.js
* 在项目下面创建并编写cli.js的文件
```
#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果Linux 或者 Mac 系统下，还需要修改此文件权限为755: chmod 755 cli.js

const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')  // 命令行交互插件
const ejs = require('ejs')    // 模板引擎

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
    default: 'my-project'
  },
  {
    type: 'input',
    name: 'desc',
    message: 'Project description?'
  }
])
.then(answer => {
  // 根据用户回答的结果生成文件
  // 拿到模板文件
  const template = path.join(__dirname,'templates')
  // 目标目录
  const dist = process.cwd()

  // 将模板下的文件全部转换到目标目录
  fs.readdir(template, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(template,file), answer, (err, result) => {
        if(err) throw err
        // 将结果写入到目标目录
        fs.writeFileSync(path.join(dist, file),result)
      })
    });
  })
})

```
* 将模板文件放入templates/index.html,templates/main.js
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my-project</title>
</head>
<body>
    <h1>project name: my-project</h1>
    <p>project description: moudle</p>

    <script src="./main.js"></script>
</body>
</html>
```
---
```
const projName = 'my-project';

console.log(`project name: ${projName}`);
```
* 执行命令将程序关联到全局: yarn link
![avatar](http://wx3.sinaimg.cn/large/006z4CF9ly1ghh2xj9pb0j317b0p2q6v.jpg)
* 退出这个文件夹,重新创建testPro文件夹,并进入这个文件夹
cd .. / mkdir test-pro / cd test-pro
![avatar](http://wx1.sinaimg.cn/large/006z4CF9ly1ghh37sfllwj31d00r5q7m.jpg)
* 执行脚手架 baolin-proj
![avatar](http://wx2.sinaimg.cn/large/006z4CF9ly1ghh39bzlpyj31a60rqdkq.jpg)


---
2,尝试使用 Gulp 完成项目的自动化构建
项目说明；这是一个基于gulp构建的项目,使用了swig模板引擎，使用gulp实现了样式编译、脚本编译、页面模板编译、图片和文字之间的转换
、文件清除、自动加载插件、服务器，热更新、文件压缩等功能。在以后使用中可以直接拿过来就直接使用
* 创建文件夹 mkdir gulp-project 并进入该文件夹 cd gulp-project
* yarn init --yes 初始化package.json
* 安装gulp    yarn add gulp
* 创建gulpfile.js文件
```
const {src, dest, parallel, series, watch} = require('gulp')

const del = require('del')

const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')

const plugins = loadPlugins()
const bs = browserSync.create()

const clean = () => {
  return del(['dist'])
}

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const style = () => {
  return src('src/assets/styles/*.scss', {base: 'src'})
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js', {base: 'src'})
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('src/*.html', {base: 'src'})
    .pipe(plugins.swig({ data, defaults: { cache: false }  }))
    .pipe(dest('dist'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('src/assets/images/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', {base:'public'})
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: true,  是否打开浏览器
    // files: 'dist/**',  // dist目录里面的文件发生改变后，浏览器自动更新
    server: {
      baseDir: ['dist','src','public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = ()=> {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    // html js css
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(clean, parallel(compile, image, font, extra))
// 开发时执行的任务
const develop = series(compile, serve)

module.exports = {
  clean,
  compile,
  build,
  develop,
  useref
}
```
* package.json文件
```
{
  "name": "gulp_demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "clean": "gulp clean",
    "compile": "gulp compile",
    "develop": "gulp develop",
    "build": "gulp build"
  },
  "devDependencies": {
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "browser-sync": "^2.26.10",
    "del": "^5.1.0",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-clean-css": "^4.3.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-imagemin": "^7.1.0",
    "gulp-load-plugins": "^2.0.3",
    "gulp-sass": "^4.1.0",
    "gulp-swig": "^0.9.1",
    "gulp-uglify": "^3.0.2",
    "gulp-useref": "^4.0.1"
  },
  "dependencies": {
    "bootstrap": "^4.5.0"
  }
}

```
3,使用 Grunt 完成项目的自动化构建
* 新建项目文件夹 my-grunt
* yarn init --yes  //初始化package文件
* 添加grunt    // yarn add grunt
* 在根目录上添加gruntfile.js文件
安装插件：
* 清除插件-清除在项目开发过程中临时生成的文件(指定)
    yarn add grunt-contrib-clean
* sass插件-  yarn add grunt-sass sass --dev
* 使用es6的语法需要安装babel插件:    yarn add grunt-babel @babel/core @babel/preset-env --dev
* 自动加载所有的插件-- yarn add load-grunt-tasks --dev
* 监视文件变化
  yarn add grunt-contrib-watch --dev
* 浏览器
  yarn add browser-sync --dev
* html文件编译处理
  yarn add grunt-web-swig --dev

<!-- 文件内容 -->
```
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
//  需要导出一个函数
//  此函数接收一个 grunt 的形参，内部提供一些创建任务时可以用到的 API

const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
const browserSync = require("browser-sync")
const bs = browserSync.create()

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

module.exports = grunt => {
  grunt.initConfig({
    // 清除文件功能
    clean: ['dist/**'],
    // sass转化为css
    sass: {
      options: {
        sourceMap: true, //设置后会生成相应的sourceMap文件
        implementation: sass
      },
      main: {
        files: {
          // 目标文件：源文件
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
        }
      }
    },
    // es6转化为es5
    babel: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: true
      },
      main: {
        files: {
          // 目标文件：源文件
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    web_swig: {
      options: {
        swigOptions: {
          cache: false
        },
        getData: function (tpl) {
          return data;
        }
      },
      main: {
        expand: true,
        cwd: 'src/',
        src: "**/*.html",
        dest: "dist/"
      },
    },
    // 热更新--监视功能
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass', 'bs-reload']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['web_swig', 'bs-reload']
      }
    },
  })
  // 启动browserSync
  grunt.registerTask("bs", function () {
    const done = this.async();
    bs.init({
      notify: false,
      port: grunt.option('port') || 2080,
      open: grunt.option('open'),
      // files: 'temp/**',
      server: {
        baseDir: ['dist', 'src', 'public'], // 按顺序查找
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    }, function (err, bs) {
      done();
    });
  });

  loadGruntTasks(grunt) //自动加载所有的 grunt 插件中的任务
  grunt.registerTask('compile', ['sass', 'babel', 'web_swig'])

  grunt.registerTask('serve', ['compile', 'bs', 'watch'])
}
```

<!-- pakage.json -->
```
{
  "name": "my-grunt",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "clean": "grunt clean",
    "serve": "grunt serve",
    "compile": "grunt compile"
  },
  "dependencies": {
    "@babel/core": "^7.11.1",
    "@babel/preset-env": "^7.11.0",
    "grunt": "^1.2.1",
    "grunt-babel": "^8.0.0",
    "grunt-contrib-clean": "^2.0.0"
  },
  "devDependencies": {
    "bootstrap": "^4.5.1",
    "browser-sync": "^2.26.12",
    "grunt-contrib-watch": "^1.1.0",
    "grunt-sass": "^3.1.0",
    "grunt-web-swig": "^0.3.1",
    "load-grunt-tasks": "^5.1.0",
    "sass": "^1.26.10"
  }
}

<!-- 演示命令 -->
yarn clean    // 清除文件
yarn compile
yarn serve
```