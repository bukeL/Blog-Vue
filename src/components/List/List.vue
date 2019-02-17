<template>
  <div class="wrapper panel new">
        <h3>最新发布</h3>
        <div class="entry" v-for ="(post,posts_id) in categoriyPost" :key = "posts_id" >
          <div class="head">
            <span class="sort">{{post.category_name}}</span>
            <router-link :to = "{name:'Detail',query:{id:post.posts_id}}">{{post.title}}</router-link>
          </div>
          <div class="main">
            <p class="info">{{post.user_name}} 发表于 {{post.created | convertTime('YYYY-MM-DD')}}</p>
            <p class="brief">{{post.content}}</p>
            <p class="extra">
              <span class="reading">阅读({{post.views}})</span>
              <a href="javascript:;" class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞({{post.likes}})</span>
              </a>
              <router-link :to = "{name:'List',query:{id:post.categories_id,page:1}}" class="tags">
                分类：<span>{{post.category_name}}</span>
              </router-link>
            </p>
            <router-link :to = "{name:'Detail',query:{id:post.posts_id}}" class="thumb">
              <img :src="post.feature" alt="">
            </router-link>
          </div>
        </div>
        <div v-show ="isShow" ><p class="noCategories">已经没有了哦</p></div>
        <p class="load" @click="loadMore()" v-show ="!isShow">加载更多{{this.page}}</p>
        <p class="underscore" v-show="isShow">------------------------------我也是有底线的------------------------------</p>
        <!-- <p class="underscore" v-show= "isUnderscore">我也是有底线的</p> -->
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        listId: 0,
        categoriyPost: [],
        page: 1,
        isShow: false,
        // isShowLoad:true,
      }
    },
    methods:{
      //第一次加载组件 或路由跳转来的时候调用的方法
      loadPost(id,page){
         this.$axios.get('myCategoriyPost?id='+ id +'&page='+page)
         .then(res => {
             this.categoriyPost = res.data
             this.page++
             if(res.data.length == 0){
              this.isShow = true
             }
         })
         .catch(err => {
          console.log(err)
         })
      },
      //点击事件调用的方法
      loadMore(){
      this.$axios.get('myCategoriyPost?id='+ this.listId +'&page='+this.page) 
      .then(res => {
        if(res.data.length == 0){
          this.isShow=true
          // this.isShowLoad = false
        }
         this.page ++
         this.categoriyPost = this.categoriyPost.concat(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    },
    created (){
      this.isShow= false
      // this.isShowLoad = true
      this.listId = this.$route.query.id || 1;
      this.page = this.$route.query.page || 1;
      //测试出bug后加的代码
      if(this.page < 1) {
        this.page = 1
      }
      this.loadPost(this.listId, this.page)
      // alert(this.listId)
    },
    beforeRouteUpdate(to, from, next){
      //路由复用,但参数改变时触发改变
      //参数可以是:query也可以是params
      this.isShow= false
      // this.isShowLoad = true
      this.listId =to.query.id || 1
      // alert(this.listId)
      this.page = to.query.page || 1
      //测试出bug后加的代码
      if(this.page < 1) {
        this.page = 1
      }
      this.loadPost(this.listId,this.page)
      // console.log(this.categoriyPost)  
      // alert(this.listId)
      next()
    }
  }
</script>

<style scoped>
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
.new{
  padding: 0 20px;
  margin: 20px 320px 0 210px
}
.panel .entry {
  position: relative;
  clear: both;
}

.panel .entry + .entry {
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.sort li:after {
  content: '';
  width: 110%;
  margin: 0 -20px;
  border-bottom: 1px solid #eee;
  position: absolute;
  left: 0;
  bottom: 0;
}

.panel .head {
  height: 30px;
  line-height: 1;
  padding: 5px 0;
  margin: 8px 0 10px 0;
  box-sizing: border-box;
  font-size: 22px;
  color: #444;
}

.panel .head a {
  color: #444;
  transition: all 0.5s;
}

.panel .head a:hover {
  color: #ff5e52;
}

.panel .head .sort {
  position: relative;
  display: block;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  margin-right: 10px;
  float: left;
  color: #fff;
  background-color: #ff5e52;
  font-size: 12px;
}

.panel .head .sort:after {
  display: block;
  position: absolute;
  top: 8px;
  right: -8px;
  content: '';
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent #ff5e52;
}

.panel .main {
  overflow: hidden;
  margin-bottom: 8px;
}

.info {
  font-size: 12px;
  color: #999;
}

.brief {
  line-height: 22px;
  margin-top: 6px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #777;
}

.extra {
  font-size: 12px;
  color: #999;
}

.extra .fa {
  width: 12px;
  height: 12px;
}

.extra > span,
.extra > a {
  margin-right: 20px;
}

.extra a {
  color: #999;
}

.extra .like:hover {
  color: #ff5e52;
}

.extra a span {
  text-decoration: underline;
}

.tags span:hover {
  color: #ff5e52;
}

.entry p {
  width: 75%;
  float: left;
  clear: both;
}

.entry .thumb {
  display: inline-block;
  width: 20%;
  margin-left: 5%;
  position: relative;
  overflow: hidden;
}

.entry .thumb:after {
  display: inline-block;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all 0.25s linear;
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
}

.entry .thumb:after {
  left: 0;
  right: 0;
}

.entry .thumb:hover:after {
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.noCategories{
  font-size: 40px;
  text-align: center;
}
</style>