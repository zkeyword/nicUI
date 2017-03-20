var webpack = require('webpack');
var path = require('path');
var projectRoot = path.resolve(__dirname, '../../')

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');

module.exports = {
    context: __dirname,

    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: 'js/[name].js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['', '.js'],
        fallback: [path.join(__dirname, '../node_modules')],
        modulesDirectories: [
            'node_modules',
            'lib',
            'styles'
        ],
        alias: {
            zepto: "zepto.min",
            template: "template.min"
        }
    },

    externals: {
        'zepto': "zepto.min"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                query: {
                    minimize: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 1,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({ browsers: ['last 10 versions'] }),
            cssnano({
                zindex: false,
                colormin: false
            })
        ];
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('css/[name].css')
    ]
}