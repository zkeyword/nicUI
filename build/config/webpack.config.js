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

    entry: [
        `${projectRoot}/src/main.js`,
        `../public/index.styl`,
        `${projectRoot}/app/styles/index.styl`,
        // Add the client which connects to our middleware
        // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
        // useful if you run your app from another point like django
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        // And then the actual application
        './dev-client.js'
    ],

    output: {
        path: __dirname,
        filename: 'nicUI.js',
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
                loader: "style-loader!css-loader!postcss-loader!stylus-loader"
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.html$/,
                loader: 'html',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 8192,
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
    postcss: function () {
        return [
            autoprefixer({ browsers: ['last 10 versions'] }),
            mqpacker,
            cssnano({
                zindex: false,
                colormin: false
            })
        ];
    },


    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        //new ExtractTextPlugin('styles.css')
        //new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ],
};