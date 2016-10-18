var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: [
	  {
        test: /\.less$/,
        loader:  ExtractTextPlugin.extract('style', 'css!less')
      },
	  { test: /\.(ttf|eot|svg)(.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif|woff|woff2)$/, loader: 'url?name=img/[name].[ext]' }
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js')
  },
  
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
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
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].css'))
  ]
})
