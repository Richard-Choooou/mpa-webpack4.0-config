const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const config  = require('./config')
const ENV = process.env.NODE_ENV
const resolveEntryFile = require('./utils').resolveEntryFile
const resolveHtmlFile = require('./utils').resolveHtmlFile
const getEntrysPath = require('./utils').getEntrysPath

const jsEntrys = resolveEntryFile('js')
const webpackBaseConfig = {
    entry: getEntrysPath(jsEntrys),
    output: {
        filename: 'js/[name].[hash].js',
        path: config.distRootPath,
        publicPath: './'
    },
    resolve: {
        alias: {
            '@': config.pagesRootPath
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /\/node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.scss$/,
            use: [{
                loader: miniCssExtractPlugin.loader,
            }, {loader: 'css-loader'}, {loader: 'sass-loader'}]
        }, {
            test: /\.html$/,
            use: [{loader: 'html-loader'}]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: ENV == 'production' ? '[name].[hash].[ext]' : '[name].[ext]',
                    outputPath: './images'
                }
            }]
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'commons',
            filename: 'js/[name].[hash].js'
        }
    },
    plugins: [
        new ProgressBarPlugin(),
    ]
}

const htmlEntry = resolveHtmlFile('html')

for(let i in htmlEntry) {
    webpackBaseConfig.plugins.push(
        new htmlWebpackPlugin({
            template: htmlEntry[i].path,
            filename: path.resolve(config.distRootPath, `${htmlEntry[i].dir}.html`),
            inject: 'body',
            chunks: ['commons', htmlEntry[i].dir],
        })
    )
}

const styleEntryList = resolveEntryFile('scss')

for(let i in styleEntryList) {
    webpackBaseConfig.plugins.push(
        new miniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
    )
}


module.exports = webpackBaseConfig