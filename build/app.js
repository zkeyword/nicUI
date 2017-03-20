const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const process = require('process');

const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config');
const compiler = webpack(webpackConfig);
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const markdown = require('markdown').markdown

app.use(WebpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(WebpackHotMiddleware(compiler));


/* post参数的解析 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* 设定静态文件目录 */
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'html');
// app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');

/* 设定静态文件目录 */
app.use(express.static(path.join(__dirname, '/public/')));
app.use(favicon(path.join(__dirname + '/public/favicon.ico')));

/* 添加路由 */
require('./router')(app);

/* 全局方法 */
global.markdown = function (str, callback) {
    return markdown.toHTML(fs.readFileSync(str, 'utf-8'));
}

//监听错误
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});


module.exports = app;