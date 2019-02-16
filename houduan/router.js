var express = require('express')
var upload = require('./multer/multer.js')
// var json = require('./api/categories.js')
var db = require('./api/mysql.js')
// console.log(json)
var router = express.Router()
var path = require('path')
// console.log(json)
//所有分类

router.get('/api/allCategories',function (req, res) {
	var sql = 'select categories.id,name,icon.icon,slug from categories inner join icon on icon.categories_id = categories.id'
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
	// console.log(nowPage)
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
		// console.log(results.id)
		// var result = JSON.parse(results)
		
		var result = JSON.parse(JSON.stringify(results))
		// console.log(result[0].id)
		req.session.admin = result[0]

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
		// console.log(results)
		res.status(200).json(results)
	})
	}
})
//获取所有文章数量以及未批准的数量
router.get('/api/getAllPosts', function(req, res) {
	// console.log(req.session.admin)
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
 var sql = 'select count(1) as num from posts'
 db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(1）
		// console.log(results)
		res.json(results)
	})
})
//获取未批准文章的数量
router.get('/api/getDraftedNum', function(req, res) {
	if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
 var sql = 'select count(1) as num from posts where status="未批准"'
 db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(1）
		// console.log(results)
		res.json(results)
	})
})

//查询所有文章,
router.get('/api/myAllPosts', function (req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
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
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	// console.log(req.query)
	var category = req.query.category || 0
	var status = req.query.status || 0
	var nowPage = req.query.page || 1
	var size = req.query.size || 10
		if(nowPage < 1){
		nowPage = 1
	}
	// console.log(category,status)
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

//允许文章发布的api, 点击更改文章状态
router.get('/api/changeStatus', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
// console.log(req.query.id)
	var id = req.query.id || 0
	var sql = `update posts set status ='已发布' where id = ${id}`
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

//通过id删除一片文章

router.get('/api/deletePost', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
// console.log(req.query.id)
	var id = req.query.id || 0
	var sql = `delete from posts where id in (${id})`
	// console.log(sql)
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

//增加分类列表
router.get('/api/insertCategory', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
// console.log(req.query.id)
	var name = req.query.name || null
	var slug = req.query.slug || null
	var sql = `insert into categories values (null, '${slug}', '${name}');`
	// console.log(sql)
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


// 通过id删除分类deleteCategory
router.get('/api/deleteCategory',function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	// console.log(req.query.id)
	var id = req.query.id || null
	var sql= `delete from categories where id in (${id})`
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

//修改目录名称 
router.get('/api/updateCategory', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	var id = req.query.id || null
	var name = req.query.name || null
	var slug = req.query.slug || null
	// console.log(id,name,slug)
	var sql =`update categories set slug = '${slug}', name = '${name}' where id = ${id}`
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

//查询所有用户findAllUSers
router.get('/api/findAllUsers', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	var nowPage = req.query.page || 1
	var size = req.query.size || 10
	var offset = (nowPage - 1)* size 
	var sql = `select * from users limit ${offset},${size};`
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


//添加一个用户
router.post('/api/insertUser', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	// console.log(req.query.id)req.body.param.myEmail
	// console.log(req.body.params)
	var email = req.body.params.email || null
	var slug = req.body.params.slug  || null
	var nickname = req.body.params.nickname || null
	var password = req.body.params.password  || null
	// console.log(email,slug,nickname,password)
	if(email==null || slug==null || nickname==null || password==null){
		res.json({msg:'任意一项不能为空'})
		return
	}
	var sql = `insert into users (id,email, slug, nickname,password) values (null,'${email}', '${slug}','${nickname}','${password}')`
	// console.log(sql)
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
//删除一个用户
router.get('/api/deleteUser',function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	// console.log(req.query.id)
	var id = req.query.id || null
	var sql= `delete from users where id in (${id})`
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

//更新用户信息updateUser
router.post('/api/updateUser', function(req, res) {
		if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	var id = req.body.params.id || null
	var email = req.body.params.email || null
	var slug = req.body.params.slug  || null
	var nickname = req.body.params.nickname || null
	var password = req.body.params.password  || null
	// console.log(id,name,slug)
	var sql =`update users set slug = '${slug}',email = '${email}',nickname = '${nickname}',password = '${password}' where id = ${id}`
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

//上传文章
router.post('/api/addPosts', upload.single('feature'),function(req, res) {
	if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
		var id = req.session.admin.id
		// res.json(req.body)
		var title = req.body.title
		var content = req.body.content
		var slug = req.body.slug
		var feature = 'http://localhost:3000/static/uploads' + '/' +  req.file.filename
		var category = req.body.category
		var created = req.body.created
		var status = req.body.status
		// console.log(feature)
		// console.log(req.file)
		// res.json({a:req.body,b:req.file})
		// console.log(req.file)
		var sql =`insert into posts values 
		(null, '${slug}', '${title}', '${feature}', '${created}','${content}','0','0','${status}','${id}','${category}');`
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

router.get('/api/loginOut',function(req, res){
	 delete req.session.admin;
     res.json({
     	code:1,
     	msg:'退出登录'
     })
})

router.get('/api/getUserInfo', function(req, res){
	if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	var user = req.session.admin
	// console.log(user)
	res.json(user)

})
//修改登录管理员的个人信息
router.post('/api/submitAdminInfo', upload.single('avatar'),function(req, res) {
	if(!req.session.admin){
		res.send({
			code: -1,
			msg:'用户没有登录'
		})
		return
	}
	if(req.file){
		var avatar = 'http://localhost:3000/static/uploads' + '/' +  req.file.filename
	}else{
		var avatar = req.session.admin.avatar
	}
		var id = req.session.admin.id
		var slug = req.body.slug
		var email = req.body.email
		var nickname = req.body.nickname
		var bio = req.body.bio
		// res.json(req.body)
		// var avatar = 'http://localhost:3000/static/uploads' + '/' +  req.file.filename
		// console.log(feature)

		// res.json({a:req.body,b:req.file})
		// console.log(req.file)
		var sql =`update admin set 
		slug='${slug}',
		nickname='${nickname}', 
		bio='${bio}', 
		email='${email}',
		avatar='${avatar}' 
		where id='${id}'`;

		db.query(sql, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		// console.log(result)
		// console.log(req.session.admin)

		var sql2 = `select * from admin where id = ${id}`
		db.query(sql2, function(error, results, fields){
		if(error){
			console.log(error)
			return
		}
		var result = results
		req.session.admin = result[0]
		var json = {
			code: 1,
			result:result
		}
		res.json(json)

	})
	})

})

//用户登录
router.post('/api/userLogin', function(req, res) {
	//一个邮箱的正则表达式,,,防止SQL注入
	var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
	var email = req.body.param.myEmail
	var password = req.body.param.myPassword
	// console.log(password)
	if (emailFormat.test(email)) {
		var sql = `select * from users where email = '${email}' and password = '${password}'`
		db.query(sql, function(error, results, fields){
			if(error){
				console.log(error)
				return
			}
			// console.log(results.id)
			// var result = JSON.parse(results)
			
			var result = JSON.parse(JSON.stringify(results))
			// console.log(result[0].id)
			req.session.user = result[0]

			res.json(results)
	})
	} else{
		// console.log(4)
		res.json({isOK:false})
	}
	
	// res.status(200).json({isOk:false})
})

//用户注册接口
router.post('/api/userRegister', function(req, res) {
	//一个邮箱的正则表达式,,,防止SQL注入
	var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
	var email = req.body.param.myEmail
	var password = req.body.param.myPassword
	var	nickname = req.body.param.myNickname
	// console.log(password)
	if (emailFormat.test(email)) {
		var sql = `insert into users(id,email,password,nickname) values (null,'${email}','${password}','${nickname}')`
		db.query(sql, function(error, results, fields){
			if(error){
				console.log(error)
				return
			}
			var sql =`select * from users where email='${email}'`
			db.query(sql, function(error, results, fields){
				if(error){
					console.log(error)
					return
				}
				// console.log(results.id)
				// var result = JSON.parse(results)
				
				var result = JSON.parse(JSON.stringify(results))
				// console.log(result[0].id) 
				req.session.user = result[0]

				res.json({
					code:1, 
					results})
		})

	})
	} else{
		// console.log(4)
		res.json({
			code:-1,
			isOK:false})
	}
	
	// res.status(200).json({isOk:false})
})
module.exports = router
