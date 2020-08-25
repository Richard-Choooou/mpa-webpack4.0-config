const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const config  = require('./config')
const ENV = process.env.NODE_ENV
const resolveEntryFile = require('./utils').resolveEntryFile
const resolveHtmlFile = require('./utils').resolveHtmlFile
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const entrys = resolveEntryFile()
console.log('entrys:', entrys)

const webpackBaseConfig = {
    entry: entrys,
    output: {
        filename: 'js/[name].[hash].js',
        path: config.distRootPath,
        publicPath: './'
    },
    resolve: {
        alias: {
            '@': config.srcPath
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /\/node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        }, {
            test: /\.scss$/,
            use: [{
                loader: miniCssExtractPlugin.loader,
                options: {
                    publicPath: '/'
                }
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
        }, {
            test: /\.(woff|svg|eot|ttf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts'
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
        new VueLoaderPlugin()
    ]
}

const htmlEntry = resolveHtmlFile()

for(let name in htmlEntry) {
    webpackBaseConfig.plugins.push(
        new htmlWebpackPlugin({
            template: htmlEntry[name],
            filename: path.resolve(config.distRootPath, `${name}.html`),
            inject: 'body',
            chunks: ['commons', name],
        })
    )
}

for(let i in entrys) {
    webpackBaseConfig.plugins.push(
        new miniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
    )
}

// console.log(webpackBaseConfig.entry)


module.exports = webpackBaseConfig