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
