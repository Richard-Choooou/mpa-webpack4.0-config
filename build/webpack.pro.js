const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const webpackCleanPlugin = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const config = require('./config')
const resolveEntryFile = require('./utils').resolveEntryFile


const webpackProductionConfig = merge(webpackBaseConfig, {
    plugins: [
        new webpackCleanPlugin(
            ['../dist'], {
                root: path.resolve(__dirname),
                allowExternal: true
            }
        )
    ]
})

module.exports = webpackProductionConfig
