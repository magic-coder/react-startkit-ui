'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
    new CleanWebpackPlugin([
        'dist',
    ], {
        root: __dirname,
    }),
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        },
        PRODUCTION: JSON.stringify(true),
    }),
    new ExtractTextPlugin({
        filename: 'css/[name].[hash:5].css',
        allChunks: true,
        disable: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
    }),
    new HtmlWebpackPlugin({
        title: 'React Startkit UI',
        filename: 'index.html',
        template: './src/index.html',
        minify: {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,   // 是否去掉注释
            collapseWhitespace : true,  // 是否去掉空格
        },
        // 把 CommonsChunkPlugin 的依赖关系自动添加 js, css
        chunksSortMode: 'dependency',
    }),
    // 压缩 JS、CSS
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'module', '_']
        },
        compress: {
            warnings: false,
            drop_console: true,
            pure_funcs: ['console.log'],
        },
        output: {
            comments: false,
        }
    }),
];

module.exports = {
    entry: {
        main: './src/index.jsx',
        vendor: ['react', 'react-dom', 'react-router'],
    },
    // 打包
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:5].js',
        publicPath: '/',
    },
    // 解析
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            },
                        },
                        'postcss-loader',
                        'sass-loader'
                    ],
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            },
                        },
                        'postcss-loader'
                    ],
                }),
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: ['url-loader'],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'url-loader?limit=1000&name=assets/images/[name].[hash:5].[ext]',
                    'image-webpack-loader',
                ],
            }

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    // 插件
    plugins: plugins,
};