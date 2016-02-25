'use strict';

var path = require('path');
var webpack = require('webpack'); 

module.exports = {
	entry: [
		'./src/js/main.js'
	],
	resolve: {
		modulesDirectories: [
			'node_modules',
			'lib'
		],
		alias: {
			jquery: "jquery1.10.2.js"
		}
	},
	externals: {
		jquery: 'jQuery' //引用外部cdn时，可排除外部的代码
	},
	output: {
		path: __dirname + "/dest/js/",
		filename: "nicUI.js"
	},
	module: {
		loaders: [
			/*{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jscrambler-loader'
			}*/
		]
	},
	plugins: [
		/*
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				'root.jQuery': 'jquery'
			})
		*/
	]
};
