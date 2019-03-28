let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./myplugins/FileListPlugin.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InlineSourcePlugin = require('./myplugins/InlineSourcePlugin.js')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'build.js'
  },
  mode:'development',
  devtool:'source-map',
  watch:false,
  resolveLoader:{
    modules:['node_modules','myloader']
    //modules:['myloader','node_modules']
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets: ['@babel/preset-env']
            }
          },
          {
            loader:'banner-loader',
            options:{
              text:'自己测试',
              filename:path.resolve(__dirname,'banner.js')
            }
          },
        ]
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:20*1024
          }
        }
      },
      {
        test:/\.less$/,
        use:[MiniCssExtractPlugin.loader,'css-loader','less-loader']
      },
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index_tmp.html',
      filename:'index.html'
    }),
    // new InlineSourcePlugin({
    //   match:/\.(css|js)$/
    // }),
    new FileListPlugin({
      filename:'list.md'
    })
  ]
};
