const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 配合 vue-loader 使用，用于编译转换 .vue 文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 用于生成 index.html 文件

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader', // 能转base64 就转 / fallback(保底的) file-loader
          options: {
            name: 'img/[name].[contenthash:6].[ext]',
            esModule: false,
            limit: 5 * 1024 // kb
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Vue App Demo'
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"/"'
    })
  ]
}
