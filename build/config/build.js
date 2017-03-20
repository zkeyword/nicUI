// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var co = require('co')
var fs = require('fs')
var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')


var spinner = ora('building for production...')
spinner.start()

rm('-rf', path.resolve(__dirname, '../../dist'))
mkdir('-p', path.resolve(__dirname, '../../dist'))

var baseEntry = {},
    entry = {},
    handle = next => {
        webpack(webpackConfig, function (err, stats) {
            if (err) throw err
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n')
        });
        if (next) return next();
        spinner.stop();
    },
    getName = next => {
        fs.readdir(path.join(__dirname, '../../src/components/'), function (err, files) {
            for (let i = 0, len = files.length; i < len; i++) {
                if( !/\./.test(files[i]) ){
                    entry[ files[i] ] = path.join(__dirname, '../../src/components/') + files[i] + '/index.js';
                }
            }
            next();
        });
    },
    handleBaseEntry = next => {
        baseEntry['moeui'] = path.join(__dirname, '../../src/main.js');
        webpackConfig.entry = baseEntry;
        handle(next);
    },
    handleEntry = () => {
        webpackConfig.entry = entry;
        handle();
    }

co(function* () {
    yield handle;
    yield getName;
    yield handleBaseEntry;
}).then(function (value) {
    handleEntry();
}, function (err) {
    console.error(err.stack);
});

