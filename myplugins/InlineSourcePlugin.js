const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin{
  constructor({match}){
    this.reg = match
  }
  processTag(tag,compilation){
    let newTag,url
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag = {
        tagName:'style',
        attributes:{type:'text/css'}
      }
      url = tag.attributes.href
    }
    if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
      newTag = {
        tagName:'script',
        attributes:{type:'appication/javascript'}
      }
      url = tag.attributes.src
    }
    if(url){
      newTag.innerHTML = compilation.assets[url].source()//获取文件内容
      delete compilation.assets[url]
      return newTag
    }
    return tag
  }
  processTags(data,compilation){
    let headTags = []
    let bodyTags = []
    data.headTags.forEach(headtag => {
      headTags.push(this.processTag(headtag,compilation))
    })
    data.bodyTags.forEach(bodytag => {
      bodyTags.push(this.processTag(bodytag,compilation))
    })
    return {...data,headTags,bodyTags}
  }
  apply(compiler){
    compiler.hooks.compilation.tap('InlineSourcePlugin',(compilation) => {
      //HtmlWebpackPlugin的api
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('InlineSourcePlugin',(data,cb) =>{
        data = this.processTags(data,compilation)
        cb(null,data)
      })
    })
  }
}
module.exports = InlineSourcePlugin