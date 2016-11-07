var path = require('path')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    nicUI: './src/js/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  node: {
	fs: 'empty'
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
	  'template': "art-template"
    }
  },
  externals: {
    jquery: 'jQuery' //引用外部cdn时，可排除外部的代码
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      }
    ]
  }
}
