let str = require('./a.js')

require('./index.less')
import src from'../assets/img/bg.png'
console.log(str)
let img = document.createElement('img')
img.src = src
document.body.appendChild(img)