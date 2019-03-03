<template>
  <div class="wrapper">
    <!-- <div class="content"> -->
      <div class="article" v-if ="postIsShow">
        <div v-for = "(post,index) in myOnePost" :key = "index">
        <div class="breadcrumb">
          <dl>
            <dt>当前位置：</dt>
            <dd><router-link :to = "{name:'List',query:{id:post.categories_id}}">{{post.category}}</router-link></dd>
            <dd>{{post.title}}</dd>
          </dl>
        </div>
        <h2 class="title">
          <a href="javascript:;">{{post.title}} </a>
        </h2>
        <p>{{post.content}}</p>
        <div class="meta">
          <span>{{post.user_name}} 发布于 {{post.created | convertTime('YYYY-MM-DD')}}</span>
          <span>分类: <router-link :to = "{name:'List',query:{id:post.categories_id}}">{{post.category}}</router-link></span>
          <span>阅读: ({{post.views+1}})</span>
          <a class="like" @click = "addlikes(post.posts_id,post.posts_likes)">点赞: ({{likeNum}})</a>
        </div>
        </div>
      </div>
      <div v-show ="!postIsShow" class="article"><p class="noPost">木有该博文哦</p></div>
      <my-hot/>
    <!-- </div> -->

  </div>
</template>

<script>
  export default {
  name: 'Detail',
  data () {
    return {
     detailId:0,
     detailValue:0,
     myOnePost:[],
     postIsShow:true,
     likeNum:0
    }
  },
  methods:{
    loadOnePost(id,value){
      if(arguments.length==1){
        //通过列表点击进入的detail页面
        this.$axios.get('myPostById?id='+ id) 
        .then(res => {
          this.postIsShow = true
          // console.log(res.data.length)
          if(res.data.length == 0){
            // alert('空')
            this.postIsShow = false
            return
          }
          // alert(this.postIsShow)
          this.myOnePost = res.data
          this.likeNum = this.myOnePost[0].posts_likes
          // console.log(res.data)
          this.addView(this.myOnePost[0].posts_id,this.myOnePost[0].views)
          // console.log(this.myOnePost)
        })
        .catch(err => {
          console.log(err)
        })
        // alert('一个参数')
      }else if(arguments.length==2){
        //通过搜索进入的detail页面
        this.$axios.get('myPostByValue?myValue='+ value) 
        .then(res => {
          this.postIsShow = true
          if(res.data.length == 0){
            // alert('空')
            this.postIsShow = false
            return
          }
          this.myOnePost = res.data
          this.likeNum = this.myOnePost[0].posts_likes
          this.addView(this.myOnePost[0].posts_id,this.myOnePost[0].views)
          // console.log(this.myOnePost)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    addView(id,viewNum){
      // alert(1)
      this.$axios.post('addView',{param:{'id':id,'viewNum':viewNum}})
      .then(res => {
        return
      })
      .catch(err => console.log(err))
    },
    addlikes(id,likeNum){
      // alert(1)
      this.$axios.post('addlikes',{param:{'id':id,'likeNum':likeNum}})
      .then(res => {
        // retur
        alert('谢谢点赞')
        console.log(res.data)
        this.likeNum = this.likeNum + 1
      })
      .catch(err => console.log(err))
    }
  },
  created(){
    this.detailId = this.$route.query.id || null;
    this.detailValue = this.$route.query.value || null;
    if (this.detailId != null){
        this.loadOnePost(this.detailId)
      } else {
        this.loadOnePost(null,this.detailValue)
        // alert("bianle")
      }
  },
    beforeRouteUpdate(to, from, next){
      //路由服用,但参数改变时触发改变
      //参数可以是:query也可以是params
      // alert(this.listId)
      this.detailId = to.query.id || null;
      this.detailValue = to.query.value || null
      if (this.detailId != null){
        this.loadOnePost(this.detailId)
      } else {
        this.loadOnePost(null,this.detailValue)
        // alert("bianle")
      }
      // alert(123)
      // this.loadOnePost(this.page)
      // console.log(this.categoriyPost)  
      // alert(this.listId)
      next()
  }
  }
</script>

<style scoped>
.article {
  padding: 20px;
  margin: 20px 320px 20px 210px;
  background-color: #fff;
}

.breadcrumb dt,
.breadcrumb dd {
  display: inline-block;
  color: #999;
}

.breadcrumb dd + dd:before {
    padding: 0 5px;
    content: ">";
}

.breadcrumb a {
  color: #666;
}

.breadcrumb a:hover {
  color: #ff5e52;
}

.article .title {
  line-height: 1;
  margin: 20px 0 15px;
}

.article .title a {
  color: #444;
  font-size: 22px;
}

.article .meta {
  /*margin: 20px 0;*/
  color: #999;
  font-size: 12px;
  padding: 0 20px 20px;
  margin: 20px -20px;
  border-bottom: 1px solid #eee;
}

.article .meta span {
  margin-right: 15px;
}

.article .meta a {
  color: #999;
  text-decoration: underline;
}

.article .meta a:hover {
  color: #ff5e52;
}
.noPost{
  font-size: 30px;
  text-align: center;

}
.like {
  cursor: pointer;
}
</style>