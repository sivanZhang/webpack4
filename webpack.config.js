const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 使用css压缩必须手动UglifyjsWebpackPlugin压缩JS
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',//development
    entry: './src/index.js',
    output: {
        filename: 'build[hash:6].js',//文件加哈希
        path: path.resolve(__dirname, 'dist') //__dirname  当前目录(兼容)
    },
    devServer: {// 会找index.html?
        port: 3721,
        open: false,
        progress: true,
        contentBase: path.resolve(__dirname, 'dist'), //打包目录
        compress: true // 为每个静态文件开启 gzip 压缩 
    },
    module: {
        rules: [
            {// css-loader 解析@import这种语法 style-loader 把样式用style标签形式插入到html
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]// [对象、字符串] 
            },
            {
                test: /.sass$/,
                use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader","sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html', // 打包后的名字
            minify: {// 压缩html
                removeAttributeQuotes: true, // 删除引号
                collapseWhitespace: true, //折叠空行
            },
            hash: true// 引入加哈希
        }),
        // 抽离CSS
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    optimization: {// 优化项
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial"
                }
            }
        },
        minimizer: [new UglifyjsWebpackPlugin({
            cache:true,
            parallel:true,// 是否并发打包（一起压缩多个）
            sourceMap:true// 源码映射
        }),new OptimizeCssAssetsWebpackPlugin({})]
    },
}