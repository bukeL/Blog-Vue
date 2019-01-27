<template>
	      <div class="panel top rank">
        <h3>一周热门排行</h3>
        <ol>
          <li v-for = "(post,index) in hotPosts" :key ="index">
            <i>{{index+1}}</i>
            <router-link :to = "{name:'Detail',query:{id:post.id}}">{{post.title}}</router-link>
            <span>赞({{post.likes}})</span>           
            <span>阅读 ({{post.views}})</span>
          </li>
        </ol>
      </div>
</template>

<script>
export default {
  name: 'my-rank',
  data () {
    return {
     hotPosts:[]
    }
  },
    created () {
      this.$axios.get('myHot')
      .then(res => {
        // console.log(this)
         this.hotPosts =res.data.splice(0,5)
         // console.log(this.hotPosts)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top{
    margin:20px 300px 0 210px;
    padding: 0 20px;
  }
.top ol {
  list-style: none;
  padding: 0;
}

.top li {
  line-height: 20px;
  vertical-align: middle;
  margin-bottom: 15px;
}

.top li i {
  display: inline-block;
  padding: 0 7px;
  font-size: 12px;
  font-style: normal;
  color: #fff;
  background-color: #999;
}

.top li:nth-child(1) i {
  background-color: #fd8c84;
}

.top li:nth-child(2) i {
  background-color: #7fd75a;
}

.top li:nth-child(3) i {
  background-color: #60c4fd;
}

.top a {
  color: #444;
}

.top a:hover {
  color: #ff5e52;
}

.top span,
.top .like {
  color: #999;
  float: right;
  line-height: 14px;
  font-size: 12px;
}

.top span {
  margin-right: 20px;
}
</style>
