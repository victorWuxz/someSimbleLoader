let loaderUtils = require('loader-utils')
let schemaUtils = require('schema-utils')
let fs = require('fs')
function loader(source){
  this.catcheable && this.catcheable()//缓存
  let options = loaderUtils.getOptions(this)//获取loader的options配置
  let cb = this.async()//回调函数
  let schema = {
    type:'object',
    properties:{
      text:{
        type:'string'
      },
      filename:{
        type:'string'
      }
    }
  }
  schemaUtils(schema,options,'banner-loader');//验证options是否符合规范
  if(options.filename){
    this.addDependency(options.filename)//配置watch的时候需要
    fs.readFile(options.filename,'utf8',function(err,data){
      cb(err,`/**${data}**/${source}`)
    })
  }else{
    cb(null,`/**${options.text}**/${source}`)
  }
}
module.exports = loader