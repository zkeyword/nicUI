var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');


module.exports = {
    context: __dirname,
    entry: [
        '../../src/js/main.js',
        '../../src/less/test.less',
        // Add the client which connects to our middleware
        // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
        // useful if you run your app from another point like django
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        // And then the actual application
        './dev-client.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['', '.js'],
        fallback: [path.join(__dirname, '../node_modules')],
        modulesDirectories: [
            'node_modules',
            'lib'
        ],
        alias: {
            'jquery': "jquery1.10.2.js",
            'template': "template"
        }
    },

    module: {
        loaders: [
            // {
            //     test: /\.less$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader!postcss')
            // },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer({
                remove: false,
                browsers: ['ie >= 8', '> 1% in CN'],
            }),
            mqpacker(),
            cssnano()
        ];
    },


    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: '../views/index.html',
            inject: true
        }),
        //new ExtractTextPlugin('styles.css')
    ],
};