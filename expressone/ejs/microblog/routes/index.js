var express = require('express');
var router = express.Router();
// 引入文件读取模块
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout/default/layout' });
});

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout/admin/layout' });
});

// readTestMd http://localhost:3000/readTestMd
router.get('/readTestMd', function(req, res) {
  // fs.readFile('./blogs/test.md', function (err, data) { 不能打开文件，只会显示一个文件下载。因为如果该方法不指定编码，则返回原始buffer(If no encoding is specified, then the raw buffer is returned.)。而buffer对应的content-type是application/octet-stream。
  fs.readFile('./blogs/test.md', 'utf-8', function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });
});

module.exports = router;
