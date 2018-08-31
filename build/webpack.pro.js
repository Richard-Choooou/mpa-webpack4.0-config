const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const webpackCleanPlugin = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const config = require('./config')
const resolveEntryFile = require('./utils').resolveEntryFile


const webpackProductionConfig = merge(webpackBaseConfig, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: miniCssExtractPlugin.loader,
                    options: {
                        // publicPath: '../../'
                    }
                }, {loader: 'css-loader'}, {loader: 'sass-loader'}]
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

        new CompressionPlugin({
            test: /\.(css|js)$/,
            asset: '[path].gz',
            algorithm: 'gzip'
        })
    ]
})

const styleEntryList = resolveEntryFile('scss')

for(let i in styleEntryList) {
    webpackProductionConfig.plugins.push(
        new miniCssExtractPlugin({
            filename: './css/[name].[hash].css'
        }),
    )
}

module.exports = webpackProductionConfig
