const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
    entry: {
        entry: './src/a.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-bundle.js'
    },
    module: {
        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
        rules: [
            {
                // test 表示测试什么文件类型
                test: /.css$/,
                // 使用 'style-loader','css-loader'
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: "babel_loader"
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
        host: 'localhost',
        port: 8090,
        open: true,
        hot: true
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hello World',
            template: './src/index.html' //模板地址
        })
    ]
}