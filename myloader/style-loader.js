let loaderUtils = require('loader-utils')
function loader(source){
  let styleSource = `
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
  return styleSource
}
loader.pitch = function(remainingRequest){
  //pitch会阻断loader的执行
  //让style-loader去处理less-loader!css-loader!./index.less
  //require返回的结果就是css-loader处理好返回的结果
  //require(!!less-loader!css-loader!index.less)
  let styleSource = `
    let style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this,'!!'+remainingRequest)})
    document.head.appendChild(style)
  `
  //console.log(styleSource)
  return styleSource
}
module.exports = loader