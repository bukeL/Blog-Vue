<template>
	<div class="header">
      <div class="myDiv" v-show="showLoginStatus">
        <img class="avatar" :src="showUseravatar" >
        <h3 class="span1">{{showNcikname}}</h3>
        <!-- <span class="span1"></span> -->
        <div class="box">
          <router-link :to="{name:'UserHome'}" class="btn mybtn" >个人主页</router-link>
          <button href="" class=" btn mybtn" @click="logout">注销</button>
        </div>

      </div>

      <div>
        <router-link :to = "{name:'UserLogin'}" class="btn mybtn " style="width: 91px" v-show="!showLoginStatus">登录</router-link>
        <router-link href="" :to = "{name:'UserRegister'}" class="btn mybtn" style="width: 94px" v-show="!showLoginStatus">注册</router-link>
      </div>

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
          <input  type="button" class="btn" value="搜索" @click = "searchByKey" style="padding: 6px 0">
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
     myValue:'',
     isLogin: false
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
    },
    logout(){
      this.$axios.get('userLogout')
      .then(res => {
        if(res.data.code = 1){
          
          // this.$store.commit('updateUserId','')
          window.localStorage.removeItem('nickname')
          window.localStorage.removeItem('avatar')
            
          // window.localStorage.setItem('userIsLogin', false);
          window.localStorage.removeItem('userIsLogin') 
           // this.$store.commit("updateUserIsLogin",false)
          // this.$store.commit("updateUserIsLogin",false)
           // this.$store.commit("updateUserIsLogin",false)
          // this.showLoginStatus()
          // alert(this.$store.getters.getuserIsLogin)
          this.$router.go(0)
        }
          // this.$store.commit('updateUserId','')

      })
      .catch(err => console.log(err))
    }
  },
  computed:{
    showUseravatar(){
       let avatar = window.localStorage.getItem('avatar')
        if(avatar){
          this.$store.commit('updateUserAvatar',avatar)//同步操作
        }
      return this.$store.getters.getAvatar
    },
    showNcikname(){
       let nickname = window.localStorage.getItem('nickname')
        if(nickname){
          this.$store.commit('updateUserNickname',nickname)//同步操作
        }
      return this.$store.getters.getNickname
    },
    showLoginStatus(){
      let userIsLogin = window.localStorage.getItem('userIsLogin')
      // alert(typeof userIsLogin)
      if(userIsLogin == 'true'){
          this.$store.commit('updateUserIsLogin',userIsLogin)//同步操作 ,,必须存在
        }else{
          this.$store.commit('updateUserIsLogin','false')
        }
        // console.log(this.$store.getters.getuserIsLogin)
        // alert(this.$store.getters.getuserIsLogin)
        if(this.$store.getters.getuserIsLogin == 'false'){
          return 0
        }else{
          return 1
        }
    },
  },
  created () {
    this.serachAllCategories()
    // this.changeStatus()
    // console.log(this.isLogin)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.myDiv {
  position: relative;
  background:#ff5e52;
  opacity: .9;
}
.mybtn {
  width: 90px;
  background:#ff5e52;
  opacity: .85;
  color:white;
  border:none;
}
.mybtn:hover{
  opacity: 1;
  color:#666;
}
.span1{
  color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  /*margin: 0 auto;*/
}
.box{
  margin-top: 25px 
}
.header {
  width: 190px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0
}
 .header .avatar {
  margin:0 auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(255, 255, 255, .3);
  border-radius: 50%;
  object-fit: cover;
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
