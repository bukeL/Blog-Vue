var multer  = require('multer')

var fileFilter = function(req,file,cb){
    // 当设置这个判断后  没允许的 && 没设置的类型 拒绝
    // console.log(file.mimetype);   //mimetype文件类型
    var typeArr = ['image/png','image/jpg','image/jpeg','image/gif']
    if(typeArr.indexOf(file.mimetype) != -1){
        cb(null,true);//允许
    }else{
        req.err = '失败';
        cb(null,false);
    }
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
  	const fileFormat = (file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

var upload = multer({ 
	storage: storage,
	limits:{
  		files:1, //一次只允许上传一个文件
        fileSize:5*1024*1024  // 设置文件大小不能超过5MB
  	},
  	fileFilter:fileFilter
   })

   module.exports = upload