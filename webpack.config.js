const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, './src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            { //Use ESLint to lint JS files
                test: /\.js$/i,
                enforce: 'pre',
                exclude: [/vendor/, /L\.service/, /node_modules/],
                loader: 'eslint-loader',
                options: {
                    configFile: path.resolve(__dirname, './.eslintrc')
                }
            }, { //Handle ES6 JavaScript
                test: /\.js$/i,
                exclude: [/vendor/, /L\.service/, /node_modules/],
                use: [
                    {
                        loader: 'ng-annotate-loader',
                        options: {
                            add: true
                        }
                    }, {
                        loader: 'babel-loader',
                        options: {
                            compact: false,
                            presets: ['es2015'],
                            plugins: [
                                'transform-object-rest-spread',
                                'transform-runtime'
                            ]
                        }
                    }
                ]
            }, { //Handle SCSS
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 3
                            }
                        }, {
                            loader: 'postcss-loader'
                        }, {
                            loader: 'resolve-url-loader'
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        })
    ],
    resolve: {
        extensions: ['.js', '.scss']
    }
};