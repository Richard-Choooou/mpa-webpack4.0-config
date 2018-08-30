const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const config  = require('./config')
const ENV = process.env.NODE_ENV


module.exports = {
    entry: path.resolve(config.basePath, './src/js/index.js'),
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(config.basePath, './dist')
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{loader: 'html-loader'}]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: ENV == 'product' ? '[name].[hash].[ext]' : '[name].[ext]',
                    outputPath: './images'
                }
            }]
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        })
    ]
}