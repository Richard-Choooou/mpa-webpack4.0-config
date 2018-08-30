const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const webpackCleanPlugin = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const ENV = process.argv.NODE_ENV

module.exports = merge(webpackBaseConfig, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            }
        ]
    },

    plugins: [
        new webpackCleanPlugin(
            ['../dist'], {
                root: path.resolve(__dirname),
                allowExternal: true
            }
        ),
        new miniCssExtractPlugin({
            filename: "[name].[hash].css"
        })
    ]
})

    
