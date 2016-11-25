const fs           = require('fs');
const path         = require('path');
const express      = require('express');
const app          = express();
const ejs          = require('ejs');
const favicon      = require('serve-favicon');
const serveStatic  = require('serve-static');
const compression  = require('compression');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const process      = require('process');

const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config');
const compiler = webpack(webpackConfig);
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
 
app.use(WebpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(WebpackHotMiddleware(compiler));

/* post参数的解析 */ 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* gzip */ 
app.use(compression());

/* 设定静态文件目录 */
//app.use(serveStatic(path.join(__dirname, '/public/static')));
//app.use(express.static(path.join(__dirname, '/public/static')));
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('views', './views')
app.set('view engine', 'ejs')
app.engine('.html', ejs.__express);

/* 添加路由 */
require('./router')(app);

//监听错误
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});


module.exports = app;