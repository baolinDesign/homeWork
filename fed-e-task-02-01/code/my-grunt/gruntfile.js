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

  //
}