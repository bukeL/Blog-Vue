<template>
  <div class="main">
    <div class="header">
          <div class="box">
            <div><img src="../../../assets/img/3.png" style="width: 70px;height: 70px"></div>
            <div><span class="p1">LYH</span><span>DE</span></div>
            <div class="p2"><span style="color: blue">轻</span><span  style="color: green">博</span><span  style="color: purple">客</span></div>
          </div>
      <h1 style="color: #ff5e52">用户注册</h1>
    </div>
    <!-- 
      表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。
      表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。

      后来有人想到了一种办法，来解决这个问题。
     -->
    <form id="register_form" method="post" action="/register">
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" class="form-control" v-model="myEmail" id="email" name="email" placeholder="Email" autofocus>
      </div>
      <div class="form-group">
        <label for="nickname">昵称</label>
        <input type="text" class="form-control" v-model="myNickname" id="nickname" name="nickname" placeholder="Nickname">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" v-model="myPassword" class="form-control" id="password" name="password" placeholder="Password">
      </div>
      <button type="button" class="btn btn-success btn-block" @click="userRegister">注册</button>
    </form>
    <div class="message">
      <p>已有账号? <router-link :to="{name:'UserLogin'}">点击登录</router-link>.</p>
      <p>不想注册? <router-link :to = "{name:'Home'}">点击回首页瞅瞅</router-link>.</p>
    </div>
  </div>
</template>

<script>
import myImg from '@/assets/img/default.png'
export default {
  name: 'my-left-bar',
  data () {
    return {
      myEmail: '',
      myNickname: '',
      myPassword: ''
    }
  },
  methods:{
    // userRegister(){
    //   this.$axios.post('userRegister')
    //   .then
    // }
    userRegister(){
      this.$axios.post('userRegister',{param:{'myEmail':this.myEmail,'myNickname':this.myNickname,'myPassword':this.myPassword}})
      .then(res => {
        console.log(res.data)
        if(res.data.code == 1){
          // console.log(this.myCatgory,this.myStatus,this.page)
        alert('注册成功')
        var avatar = myImg
        this.$store.commit("updateUserNickname",this.myNickname)
        this.$store.commit("updateUserAvatar",avatar)
        this.$store.commit("updateUserIsLogin",'true')
        this.$router.push({name:'Home'})
                    // this.page = page + 1
                    }
      })
      .catch(err => console.log(err))

    }
  },
  created () {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color: #f9f9f9;
}
    .box{
      width: 190px;
      height: 120px;
      /*background-color: #ff5e52;*/
      opacity: .9
    }
    .box img {
      margin-top: 20px;
      float: left;
    }
    .box .p1{
      display: block;
      font-size: 26px;
      color: red;
      padding-top: 30px;
      padding-right: 50px
    }

    .box .p2{
      /*padding-top: 30px;*/
      padding-left: 120px
    }
    .box .p2 span {
      font-size: 14px
    }
.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
}

.main .header {
  text-align: center;
}

.main .header h1 {
  font-size: 26px;
}

.main form {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 10px
}

.main .message {
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #d8dee2;
  border-radius: 5px;
}

</style>
