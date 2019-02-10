<template>
	<div class="header">
      <a href="" class="btn btn-info " style="width: 90px">登录</a>
      <a href="" class="btn btn-info " style="width: 90px">注册</a>
      <h1 class="logo">
        <router-link :to = "{name:'Home'}"><img src="../../../assets/img/logo.png" alt="">
        </router-link>
      </h1>
      <ul class="nav">
        <li v-for = "(category,id) in categories" :key = "id">
          <router-link :to = "{name:'List',query:{id:category.id}}"><i :class="category.icon+' fa'"></i>{{category.name}}</router-link>
        </li>

      </ul>
      <div class="search">
        <form>
          <input type="text" class="keys" placeholder="输入关键字" v-model="myValue">
          <input type="submit" class="btn" value="搜索" @click = "searchByKey">
        </form>
      </div>
      <div class="slink">
        <router-link :to = "{name:'Home'}">博客主页</router-link> 
        |
        <router-link :to = "{name:'AdminLogin'}">博客后台</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'my-left-bar',
  data () {
    return {
     categories:[],
     myValue:''
    }
  },
  methods:{
    searchByKey:function () {
      this.$router.push({name:'Detail',query:{value:this.myValue.trim()}})
    },
    serachAllCategories(){
      this.$axios.get('allCategories')
    .then(res => {
      this.categories =res.data
      // console.log(this.categories)
    })
    .catch(err => {
      console.log(err)
    })
    }
  },
  created () {
    this.serachAllCategories()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 190px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0
}

.header .logo {
  width: 100%;
  height: 120px;
  text-indent: -2000px;
  background: #ff5e52;
}
.header a{
  margin-top: 5px
}
.header .logo a {
  display: block;
  height: 100%;
}

.header .nav {
  font-size: 16px;
  border-bottom: 1px solid #eee;
}

.header .nav a {
  display: block;
  padding: 12px 25px;

  color: #666;
}

.header .nav a:focus,
.header .nav a:hover {
  color: #444;
}

.header .nav a.active {
  color: #ff5e52;
}

.header .nav .fa {
  width: 16px;
  height: 16px;
  margin-right: 12px;
}

.header .search {
  margin-bottom: 15px;
  padding: 30px 15px;
  border-bottom: 1px solid #eee;
}

.header .search form {
  overflow: hidden;
}

.header .search input {
  display: block;
  float: left;
  box-sizing: border-box;
}

.header .search .keys {
  width: 112px;
  height: 34px;
  color: #666;
  border: 1px solid #DDD;
  border-right: 0 none;
  padding: 5px 5px 5px 10px;
}

.header .search .keys:focus {
  outline: none;
  border-color: #CCC;
}

.header .search .btn {
  width: 48px;
  height: 34px;
  border: 0 none;
  color: #fff;
  background-color: #ff5e52;
  opacity: .85;
}

.header .search .btn:hover {
  opacity: 1;
}

.header .slink {
  text-align: center;
  font-size: 12px;
}

.header .slink a {
  color: #999;
  text-decoration: none;
}

.header .slink a:hover {
  color: #666;
}
</style>
