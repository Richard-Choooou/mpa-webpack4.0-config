const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const config  = require('./config')
const ENV = process.env.NODE_ENV
const resolveEntryFile = require('./utils').resolveEntryFile
const resolveHtmlFile = require('./utils').resolveHtmlFile
const getEntrysPath = require('./utils').getEntrysPath

const jsEntrys = resolveEntryFile('js')
const webpackBaseConfig = {
    entry: getEntrysPath(jsEntrys),
    output: {
        filename: 'js/index.[name].[hash].js',
        publicPath: config.distRootPath
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
            filename: 'js/commons.[hash].js'
        }
    },
    plugins: [

    ]
}

const htmlEntry = resolveHtmlFile('html')

for(let i in htmlEntry) {
    webpackBaseConfig.plugins.push(
        new htmlWebpackPlugin({
            template: htmlEntry[i].path,
            filename: path.resolve(config.distRootPath, `${htmlEntry[i].dir}.html`),
            inject: 'body',
            chunks: ['common', htmlEntry[i].dir],
        })
    )
}

module.exports = webpackBaseConfig