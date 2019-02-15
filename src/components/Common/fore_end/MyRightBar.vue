<template>
    <div class="aside">
      <div class="widgets">
        <h4>搜索</h4>
        <div class="body search">
        <form>
          <input type="text" class="keys" placeholder="输入关键字" v-model="myValue">
          <input  type="button" class="btn" value="搜索" @click = "searchByKey">
        </form>
        </div>
      </div>
      <div class="widgets">
        <h4>随机推荐</h4>
        <ul class="body random">
          <li v-for="(post,id,index) in randomPosts" :key ="id">
            <router-link :to = "{name:'Detail',query:{id:post.id}}">
              <p class="title">{{post.title}}</p>
              <p class="reading">阅读({{post.views}})</p>
              <div class="pic">
                <img :src="post.feature" alt="">
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'my-right-bar',
  data () {
    return {
     randomPosts:[],
     myValue:''
    }
  },
  methods:{
    searchByKey:function () {
      if(this.myValue.trim()==''){
        alert('亲,请输入要搜索的文章')
        this.myValue = ''
        return 
      }
      this.$router.push({name:'Detail',query:{value:this.myValue.trim()}})
    }
  },
    created () {
      this.$axios.get('myRandom')
      .then(res => {
         this.randomPosts =res.data
         // console.log(this.randomPosts)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside {
  width: 280px;
  margin: 0 20px;
  float: right;
}

.aside .widgets {
  padding: 15px 20px 7px 20px;
  /*margin-bottom: 0px;*/
  background-color: #fff;
  overflow: hidden;
}

.aside .widgets h4 {
  margin-bottom: 5px;
  font-size: 20px;
  border-bottom: 2px solid #ff5e52;
  float: left;
}

.aside .widgets .body {
  clear: both;
}

.aside .search {
  padding-top: 10px;
}
.aside .search form {
  height: 34px;
  position: relative;
  padding-right: 70px;
}

.aside .search input {
  display: block;
  height: 100%;
  padding: 5px 5px 5px 10px;
  box-sizing: border-box;
  color: #666;
}

.aside .search .keys {
  width: 100%;
  border: 2px solid #DDD;
  border-right: 0 none;
  outline: none;
  float: left;
}

.aside .search .btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  text-align: center;
  color: #fff;
  border: 0 none;
  background-color: #ff5e52;
  opacity: 0.85;
}

.aside .search .btn:hover {
  opacity: 1;
}

.aside .random li {
  height: 79px;
  padding: 10px 0;
}

.aside .random li + li {
  border-top: 1px solid #f0f0f0;
}

.aside .random p {
  float: left;
  clear: both;
  line-height: 20px;
}

.aside .random .title {
  width: 160px;
  font-size: 14px;
  color: #444;
}

.aside .random .reading {
  font-size: 12px;
  color: #999;
}

.aside .random .pic {
  display: inline-block;
  width: 70px;
  margin-left: 10px;
  height: 100%;
  overflow: hidden;
}

.aside .random li:hover {
  background-color: #F8FCFE;
}

.aside .random li:hover .title {
  color: #ff5e52;
}


</style>
