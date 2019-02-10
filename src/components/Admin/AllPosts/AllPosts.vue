<template>
<div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <router-link class="btn btn-primary btn-xs" :to ="{name:'AddPosts'}" role="button">写文章</router-link>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <form class="form-inline">
          <select name="" class="form-control input-sm" v-model="myCatgory">
            <option value="0">所有分类</option>
            <option  v-for="(category,id) in categories" :key="id" :value="category.id">{{category.name}}</option>
          </select>
          <select name="" class="form-control input-sm" v-model="myStatus">
            <option value="0" >所有状态</option>
            <option value="已发布">已发布</option>
            <option value="未批准">未批准</option>
          </select>
          <button class="btn btn-default btn-sm" @click="searchByIdAndStatus(myCatgory,myStatus)">筛选</button>
        </form>
<!--         <ul class="pagination pagination-sm pull-right">
          <li><a href="#">上一页</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">下一页</a></li>
        </ul> -->
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for ="(post,posts_id in allPosts" :key="posts_id ">
            <td class="text-center"><input type="checkbox"></td>
            <td>{{post.title}}</td>
            <td>{{post.user_name}}</td>
            <td>{{post.category_name}}</td>
            <td class="text-center">{{post.created | convertTime('YYYY-MM-DD')}}</td>
            <td class="text-center">{{post.status}}</td>
            <td class="text-center">
              <a  class="btn btn-default btn-xs" v-if="post.status=='未批准'" @click="changeStatus(post.posts_id)" >允许发表</a>
              <a  class="btn btn-danger btn-xs" @click="deletePost(post.posts_id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
        <p class="load" @click="loadMore(myCatgory,myStatus,page)" v-show ="isShowLoad">加载更多{{this.page}}</p>
        <div v-show ="!isShowLoad" ><p class="noPost">已经没有了哦</p></div>
        <p class="underscore" v-show="!isShowLoad">---------------------------------------------------我也是有底线的---------------------------------------------------</p>
    </div>
  </div>

</template>

<script>
  export default {
  name: 'all-posts',
    data () {
    return {
      allPosts:[],
      page:1,
      isShowLoad:true,
      // isUnderscore:false
      size:10,
      categories:[],
      myCatgory:0,
      myStatus:0
    }
  },
  methods:{
    deletePost(id){
      // alert(1)
      this.$axios.get('deletePost',{params:{id:id}})
      .then(res => {
        if(res.data.code == -1){
          alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        var mySize = (this.page-1)*10 || 10
        if(res.data.affectedRows == 1){
          // console.log(this.myCatgory,this.myStatus,this.page)
        
        this.getPostAgain(mySize)
                    // this.page = page + 1
                    }
      })
      .catch(err => console.log(err))
    },
    searchByIdAndStatus(category,status,page,size){
      this.isShowLoad = true
      this.page =  1
      // console.log(this.myCatgory,this.myStatus)
      this.$axios.get('specialpost',{params:{category:category,status:status,page:page,size:size}}) 
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        // console.log(res.data)  
        if(res.data.length == 0){
          // this.isUnderscore=true
          this.isShowLoad = false
        }
         this.page ++
         this.allPosts = res.data
      })
      .catch(err => console.log(err))
    },
    loadMore(category,status,page,size){
      // alert(this.isShowLoad)
      this.$axios.get('specialpost',{params:{category:category,status:status,page:page,size:size}}) 
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        if(res.data.length == 0){
          // this.isUnderscore=true
          this.isShowLoad = false
        }
         this.page ++
         this.allPosts = this.allPosts.concat(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    serachAllCategories(){
      this.$axios.get('allCategories')
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
      this.categories =res.data
      // console.log(this.categories)
    })
    .catch(err => {
      console.log(err)
    })
    },
    changeStatus(id){
      // console.log(event)
      this.$axios.get('changeStatus',{params:{id:id}})
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        var mySize = (this.page-1)*10 || 10
        if(res.data.affectedRows == 1){
          // console.log(this.myCatgory,this.myStatus,this.page)
        this.getPostAgain(mySize)
                    // this.page = page + 1
                    }
      })
      .catch(err => console.log(err))
    },
    getPostAgain(size){
      this.isShowLoad = true
      this.$axios.get('specialpost',{params:{category:this.myCatgory,status:this.myStatus,page:1,size:size}}) 
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
      if(res.data.length == 0){
               // this.isUnderscore=true
        this.isShowLoad = false
      }
        this.allPosts = res.data
      })
      .catch(err => console.log(err))
    }
  },
  created(){
    // alert(this.isShowLoad)
    this.serachAllCategories()
    this.page = this.$route.query.page || 1;
    this.myCatgory = this.$route.query.myCatgory || 0;
    this.myStatus = this.$route.query.myStatus || 0;
    // alert(this.page)
    // alert(this.page)
    this.searchByIdAndStatus(this.myCatgory,this.myStatus,this.page)
  },
  watch:{
    $route(to,from,next){
      // this.isUnderscore=false
      this.isShowLoad = true
      // alert('3')
      this.page= to.query.page || 1
      this.myCatgory =to.query.myCatgory || 0
      this.myStatus =to.query.myStatus || 0
      this.searchByIdAndStatus(this.myCatgory,this.myStatus,this.page)
      // console.log(this.categoriyPost)  
      // alert(this.listId)
      // alert(to.query.page)
      next()
    }
  }
}
</script>

<style scoped>
.noPost{
  font-size: 40px;
  text-align: center;
}
.load{
  height: 30px;
  line-height: 20px;
  font-size: 20px;
  color: skyblue;
  text-align:center;
}
.underscore{
  height: 30px;
  line-height: 20px;
  font-size: 20px;
  color: skyblue;
  text-align:center;
}
.load:hover{
  color: blue;
  cursor:pointer
}
.main {
  position: relative;

  overflow: hidden;

  min-width: 844px;
  min-height: 100vh;
  margin: 70px 5px 20px 185px;
}
.main .container-fluid .page-title {
  overflow: hidden;

  margin-bottom: 20px;
}

.main .container-fluid .page-title h1 {
  display: inline-block;

  margin: 0;

  font-size: 24px;
  font-weight: 400;
}

.main .container-fluid .page-title .btn-primary {
  margin-left: 5px;

  vertical-align: bottom;
}

.main .container-fluid .page-title .input-group {
  max-width: 230px;
}

.main .container-fluid .page-action {
  overflow: hidden;

  margin-bottom: 10px;
}

.main .container-fluid .page-action .btn-batch,
.main .container-fluid .page-action .form-inline {
  display: inline-block;
}

.main .container-fluid .page-action .btn {
  margin-right: 10px;
}

.main .container-fluid .pagination {
  margin: 0;
}

.main .container-fluid form h2 {
  margin-top: 5px;
  margin-bottom: 15px;

  font-size: 17px;
  font-weight: 400;
}

.main .container-fluid table {
  background-color: #fff;
}

.main .container-fluid th {
  border-bottom: 1px;

  font-weight: 400;
}

.main .container-fluid td {
  vertical-align: middle;
}

.main .container-fluid td .avatar {
  width: 40px;

  border-radius: 50%;
}

.main .container-fluid td .slide {
  width: auto;
  max-height: 80px;
}

.main .container-fluid td i {
  margin-right: 5px;
}

.main .container-fluid label {
  color: #555;

  font-weight: normal;
}

.main .container-fluid textarea {
  resize: vertical;
}

.main .container-fluid .editor-toolbar:before {
  margin-bottom: 5px;
}

.main .container-fluid .editor-toolbar:after {
  margin-top: 5px;
}

.main .container-fluid .form-horizontal {
  margin-top: 50px;
}

.main .container-fluid .form-image {
  position: relative;

  background-color: #fff;
}

.main .container-fluid .form-image input {
  display: none;
}

.main .container-fluid .form-image img {
  max-width: 150px;
}

.main .container-fluid .form-image i {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: opacity .3s;
  text-align: center;

  opacity: 0;
  background: #c0c0c0;

  font-size: 2em;
}

.main .container-fluid .form-image i::before {
  position: absolute;
  top: 50%;
  left: 50%;

  margin-top: -14px;
  margin-left: -14px;
}

.main .container-fluid .form-image:hover i {
  opacity: .6;
}

.main .container-fluid .thumbnail {
  width: 100%;
}
</style>