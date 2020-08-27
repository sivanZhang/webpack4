let path = require('path')
module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'hello.js',
        path:path.resolve(__dirname,'dist') //__dirname  当前目录
    },
    devServer:{
        port:9527,
        open:true,
        progress:true,// 打包进度条
        contentBase:"./dist/hello.js"
    }
}