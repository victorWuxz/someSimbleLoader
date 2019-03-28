let loaderUtils = require('loader-utils')
function loader(source){
  //获取文件名称
  let filename = loaderUtils.interpolateName(this,'[hash].[ext]',{content:source})
  this.emitFile(filename,source)//发射文件，将文件发射到dist目录
  //返回发射文件的路径
  return `module.exports = "${filename}"`
}
loader.raw = true//二进制
module.exports = loader