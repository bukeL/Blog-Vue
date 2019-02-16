<template>
  <div class="main">
    <div class="header">
      <a href="/">
        <img src="" alt="">
      </a>
      <h1>用户登录</h1>
    </div>
    <form id="login_form" :class="isExist?'shake animated login-wrap':'login-wrap'">
      <div class="alert alert-danger" v-if = "isExist">
        <strong>错误！</strong> 用户名或者密码错误！
      </div>
      <div class="form-group">
        <label for="">邮箱</label>
        <input type="email" class="form-control" v-model="myEmail" id="emali" name="email" placeholder="Email" autofocus>
      </div>
      <div class="form-group">
        <label for="">密码</label>
        <input type="password" class="form-control" v-model="myPassword" id="password" name="password" placeholder="Password">
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox">记住我
        </label>
      </div>
      <button type="button" class="btn btn-success btn-block" @click="userLogin">登录</button>
    </form>
    <div class="message">
      <p>没有账号? <router-link :to = "{name:'UserRegister'}">点击创建</router-link>.</p>
      <p>不想登陆? <router-link :to = "{name:'Home'}">点击回首页瞅瞅</router-link>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-left-bar',
  data () {
    return {
      myEmail: '',
      myPassword: '',
      isExist:false
    }
  },
  methods:{
    userLogin(){
      this.isExist = false
      this.$axios.post('userLogin',{param:{'myEmail':this.myEmail,'myPassword':this.myPassword}})
      .then(res => {
        console.log(res.data)
        if(res.data.length > 0) {
          // console.log(res.data[0])
          // var params = JSON.stringify(res.data[0])
          // var userInfo = {userId:res.data[0].id,nickname:res.data[0].nickname,avatar:this.img}
          var userID = res.data[0].id
          var Nickname = res.data[0].nickname
          var avatar = res.data[0].avatar
          // console.log(userInfo)
          // this.$store.commit("updateUserId",userID)
          this.$store.commit("updateUserNickname",Nickname)
          this.$store.commit("updateUserAvatar",avatar)
          this.$store.commit("updateUserIsLogin",true)
          this.$router.push({name:'Home'}) //输入正确的用户名密码,跳到主页去
          // EventBus.$emit('sendAvatar',this.img)
          // alert('123')
        } else {
          // alert ('用户名或密码错误')
          this.isExist = true 
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
}

.main .message {
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #d8dee2;
  border-radius: 5px;
}

</style>
