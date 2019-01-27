var express = require('express')
var path = require('path')
var app = express()
var router = require('./router.js')

//用于解析请求体
var bodyParser = require('body-parser')

//开放资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.use('/static/',express.static(path.join(__dirname,'./static/')))
//后台允许跨域请求
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

//引入模板引擎
app.engine('html',require('express-art-template'))

//方便以后设置
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//启动router
app.use(router)

//监听端口
app.listen(3000,function () {
	console.log('the server is running')
})