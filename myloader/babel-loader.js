let loaderUtil = require('loader-utils')
let babel = require('@babel/core')
function loader(source){
  let options = loaderUtil.getOptions(this)
  let cb = this.async()
  babel.transform(source,{
    ...options,
    sourceMap:true,
    filename:this.resourcePath.split('/').pop()
  },function(err,result){
    cb(err,result.code,result.map)
  })
}
module.exports = loader