/**
* Module dependencies.
*/
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载路由控制
var routes = require('./routes/index');
var users = require('./routes/users');

// 创建项目实例
var app = express();

// view engine setup 视图引擎设置
//__dirname是node.js里面的全局变量，即取得执行的js所在的路径，另外__dirname是目前执行的js文件名。所以，app.set(‘views’, __dirname + ‘/views’);是设置views的文件夹。
app.set('views', path.join(__dirname, 'views'));
//设置express.js所使用的render engine。除了Jade之外，express.js还支持EJS(embedded javascript)、Haml、CoffeScript和jQuery template等js模板。
app.set('view engine', 'ejs');
app.use(partials());

// uncomment after placing your favicon in /public 取消注释，如果你有自己的图标在public目录下。
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // 定义icon图标
app.use(logger('dev')); // connect 内建的中间件，在开发环境下使用，在终端显示简单的不同颜色的日志 // 定义日志和输出级别
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // connect内建的中间件定义静态文件目录，设置根目录下的public文件夹为静态文件服务器，存放 image、css、js 文件于此。

// 匹配路径和路由
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler // 404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') { // 开发环境下的错误处理，输出错误信息。
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;
