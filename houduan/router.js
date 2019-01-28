var express = require('express')
// var json = require('./api/categories.js')
var db = require('./api/mysql.js')
// console.log(json)
var router = express.Router()


// console.log(json)
//所有分类
router.get('/api/allCategories',function (req, res) {
	var sql = 'select categories.id,name,icon.icon from categories inner join icon on icon.categories_id = categories.id'
	db.query(sql,function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(results)
		res.json(results)
	})
})


//热门排行和热门推荐 
//返回前20条数据 排行取1-5条 推荐随机取4条
router.get('/api/myHot', function (req, res) {
	var sql = 'select * from posts order by posts.views desc'
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results.splice(0,20)
		// console.log(result)
		res.json(result)
	})
})


//随机推荐  从所有文章中随机取5条
router.get('/api/myRandom', function (req, res) {
	var sql = 'select * from posts'
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results.sort(()=>0.5-Math.random()).slice(0,5)
		// console.log(result)
		res.json(result)
	})
})

//通过分类id和页码page 查询分类下的文章,只查询已经批准的
router.get('/api/myCategoriyPost', function (req, res) {
	var id = parseInt(req.query.id) || 1
	//每次查询4条
	var size = parseInt(req.query.size) || 4
	//当前页码
	var nowPage = parseInt(req.query.page) || 1 
	console.log(nowPage)
	if(nowPage < 1){
		nowPage = 1
	}
	var sql = ''
	//越过多少条开始查询
	var offset = (nowPage - 1)* size
	// console.log('分类id是'+ id)
	if (id) {
		 sql =`select
	   		posts.id as posts_id,
			posts.title,
			users.nickname as user_name,
			categories.id as categories_id,
			categories.name as category_name,
			posts.created,
			users.slug as users_slug,
			posts.status,
			posts.slug,
			posts.content,
			posts.feature,
			posts.views,
			posts.likes
			from posts
			inner join categories on posts.category_id = categories.id
			inner join users on posts.user_id = users.id
			where category_id='${id}' and posts.status='已发布'
			order by posts.created desc
			limit ${offset}, ${size};`
	} 
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results
		// console.log(result)
		res.json(result)
	})
})
//通过page查询所有的文章,,,,只查询已经批准的
router.get('/api/myPosts', function (req, res) {
	var size = parseInt(req.query.size) || 4
	//当前页码
	var nowPage = parseInt(req.query.page) || 1 
	// console.log(nowPage)
	if(nowPage < 1){
		nowPage = 1
	}
	var offset = (nowPage - 1)* size
	var sql = `select
		  posts.id as posts_id,
		  categories.id as categories_id,
		  posts.title,
		  users.nickname as user_name,
		  categories.name as category_name,
		  users.slug as users_slug,
		  posts.created,
		  posts.status,
		  posts.slug,
		  posts.content,
		  posts.views,
		  posts.likes,
		  posts.feature
		  from posts
		  inner join categories on posts.category_id = categories.id
		  inner join users on posts.user_id = users.id
		  where posts.status='已发布'
		  order by posts.created desc
		  limit ${offset}, ${size};`
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results
		// console.log(result)
		res.json(result)
	})
})

//通过id查询单篇文章
router.get('/api/myPostById', function (req, res) {
	var id = req.query.id
	var sql = `select
		  posts.id as posts_id,
		  categories.id as categories_id,
		  posts.title,
		  users.nickname as user_name,
		  categories.name as category,
		  posts.created,
		  posts.status,
		  posts.slug,
		  posts.content,
		  posts.views,
		  posts.likes as posts_likes
		  from posts
		  inner join categories on posts.category_id = categories.id
		  inner join users on posts.user_id = users.id
		  where posts.id=${id}`
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results
		// console.log(result)
		res.json(result)
	})
})

//通过value查询单篇文章
router.get('/api/myPostByValue', function (req, res) {
	var value = req.query.myValue
	var sql = `select
		  posts.id as posts_id,
		  categories.id as categories_id,
		  posts.title,
		  users.nickname as user_name,
		  categories.name as category,
		  posts.created,
		  posts.status,
		  posts.slug,
		  posts.content,
		  posts.views,
		  posts.likes as posts_likes
		  from posts
		  inner join categories on posts.category_id = categories.id
		  inner join users on posts.user_id = users.id
		  where posts.title='${value}'`
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results

		// console.log(result)
		res.json(result)
	})
})

//后台管理员登录
router.post('/api/adminLogin', function(req, res) {
	//一个邮箱的正则表达式,,,防止SQL注入
	var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
	var email = req.body.param.myEmail
	var password = req.body.param.myPassword
	// console.log(password)
	if (emailFormat.test(email)) {
		var sql = `select * from admin where email = '${email}' and password = '${password}'`
		db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		res.json(results)
	})
	} else{
		// console.log(4)
		res.json({isOK:false})
	}
	
	// res.status(200).json({isOk:false})
})

//input失去焦点 ,拉取头像文件路径
router.post('/api/getAvatar', function(req, res) {
	var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
	var email = req.body.param.myEmail
	if (emailFormat.test(email)) {
		var sql = `select avatar from admin where email = '${email}'`
		db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(1）
		console.log(results)
		res.json(results)
	})
	}
})
//获取所有文章数量以及未批准的数量
router.get('/api/getAllPosts', function(req, res) {
 var sql = 'select count(1) as num from posts'
 db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(1）
		console.log(results)
		res.json(results)
	})
})
//获取未批准文章的数量
router.get('/api/getDraftedNum', function(req, res) {
 var sql = 'select count(1) as num from posts where status="未批准"'
 db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(1）
		console.log(results)
		res.json(results)
	})
})

//查询所有文章,
router.get('/api/myAllPosts', function (req, res) {
	var size = parseInt(req.query.size) || 4
	//当前页码
	var nowPage = parseInt(req.query.page) || 1 
	// console.log(nowPage)
	if(nowPage < 1){
		nowPage = 1
	}
	var offset = (nowPage - 1)* size
	var sql = `select
		  posts.id as posts_id,
		  categories.id as categories_id,
		  posts.title,
		  users.nickname as user_name,
		  categories.name as category_name,
		  users.slug as users_slug,
		  posts.created,
		  posts.status,
		  posts.slug,
		  posts.content,
		  posts.views,
		  posts.likes,
		  posts.feature
		  from posts
		  inner join categories on posts.category_id = categories.id
		  inner join users on posts.user_id = users.id
		  order by posts.created desc
		  limit ${offset}, ${size};`
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		//切割数组
		var result = results
		// console.log(result)
		res.json(result)
	})
})
router.get('/api/specialpost',function(req, res) {
	console.log(req.query)
	var category = req.query.category || 0
	var status = req.query.status || 0
	var nowPage = req.query.page || 1
	var size = req.query.size || 10
		if(nowPage < 1){
		nowPage = 1
	}
	console.log(category,status)
	var offset = (nowPage - 1)* size
	var sql = `select
		  posts.id as posts_id,
		  categories.id as categories_id,
		  posts.title,
		  users.nickname as user_name,
		  categories.name as category_name,
		  users.slug as users_slug,
		  posts.created,
		  posts.status,
		  posts.slug,
		  posts.content,
		  posts.views,
		  posts.likes,
		  posts.feature
		  from posts
		  inner join categories on posts.category_id = categories.id
		  inner join users on posts.user_id = users.id
		  `
		  if(category==0 && status==0){
		  	sql += `order by posts.created desc limit ${offset}, ${size};`

		  } else if (category==0 && status!=0) {
		  	sql += `where posts.status ='${status}' 
		  			order by posts.created desc 
		  			limit ${offset}, ${size};`
		  } else if (category!=0 && status==0) {
		  	sql += `where posts.category_id = ${category}
		  			order by posts.created desc 
		 		 	limit ${offset}, ${size}`
		  } else {
		  	sql += `where posts.category_id = ${category} and posts.status ='${status}' 
		 		 	order by posts.created desc 
		 		 	limit ${offset}, ${size}`
		  }
	db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		var result = results
		// console.log(result)
		res.json(result)
	})
})
module.exports = router
