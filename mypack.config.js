let path = require('path')
class P{
  apply(compiler){
    compiler.hooks.emit.tap('emit',params => {
      console.log('emit')
    })
  }
}
class P1{
  apply(compiler){
    compiler.hooks.afterPlugins.tap('emit',params => {
      console.log('afterPlugins')
    })
  }
}
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    path:path.join(__dirname,'dist'),
    filename:'build.js'
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        use:[
          path.resolve(__dirname,'myloader','style-loader'),
          path.resolve(__dirname,'myloader','less-loader')
        ]
      }
    ]
  },
  plugins:[
    new P(),
    new P1()
  ]
};
