var express = require('express')
var path = require('path')
var app = express()
var session  = require('express-session')
var router = require('./router.js')
var multer  = require('multer')
//用于解析请求体
var bodyParser = require('body-parser')
//开放资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.use('/static/',express.static(path.join(__dirname,'./static/')))
//后台允许跨域请求
// app.use("*", function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,token");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   next()
// });
app.use(function (req, res, next) {
　　res.header("Access-Control-Allow-Credentials", "true");
　　res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
　　// res.header('Access-Control-Allow-Origin', '*');
　　res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
　　res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　　if (req.method == 'OPTIONS') {
　　　　res.send(200); /*让options请求快速返回*/
　　} else {
　　　　next();
　　}
})

app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000*60*30, // 设置 session 的有效时间，单位毫秒
    },
}));
//引入模板引擎,,直接访问接口,返回json数据,,,没用到art-template...art-template是后端模板引擎
// app.engine('html',require('express-art-template'))

//方便以后设置 art-template的默认访问目录
// app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

// app.use(bodyParser.urlencoded({ extended: false }))
// bodyParse 用于解析请求体,是express的核心插件
app.use(bodyParser.json())

//启动router
app.use(router)

app.use(function (err, req, res, next) {

  if (err instanceof multer.MulterError) {
    res.send({ result: '上传文件失败', error: { code: -1, message: '上传文件失败' } })
    return 
  }

  // Handle any other errors
})
//监听端口
app.listen(3000,function () {
	console.log('the server is running')
})