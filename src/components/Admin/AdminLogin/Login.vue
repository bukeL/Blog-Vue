<template>
  <div  >
    <div class="login">
    <form :class="isExist?'shake animated login-wrap':'login-wrap'">
      <img  :src="img" :class="isFadeIn?'fadeIn animated avatar':'avatar'">
      <!-- 有错误信息时展示 -->
      <div class="alert alert-danger" v-if = "isExist">
        <strong>错误！</strong> 用户名或者密码错误！
      </div>
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" type="email" class="form-control" placeholder="邮箱" autofocus v-model="myEmail"  @blur="getAvatar">
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" type="password" class="form-control" placeholder="密码" v-model="myPassword">
      </div>
      <a class="btn btn-primary btn-block" @click="adminLogin">登 录</a>
    </form>
  </div>
  </div>
</template>

<script>
  import myImg from '@/assets/img/default.png'
  export default {
  name: 'Detail',
  data () {
    return {
      myEmail:'',
      myPassword:'',
      img:myImg,
      isExist:false,
      isFadeIn:false
    }
  },
  methods:{
    adminLogin(){
      this.isExist = false
      this.$axios.post('adminLogin',{param:{'myEmail':this.myEmail,'myPassword':this.myPassword}})
      .then(res => {
        console.log(res)
        if(res.data.isOk == true) {
          this.$router.push({name:'AdminHome'})
        } else {
          // alert ('用户名或密码错误')
          this.isExist = true
        }
      })
      .catch(err => console.log(err))
    },
    getAvatar(){
      // console.log('出发了')
      this.isFadeIn = false
      var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
      if (!emailFormat.test(this.myEmail)) return
      this.$axios.post('getAvatar',{param:{'myEmail':this.myEmail}})
    .then(res => {
      console.log(res)
      if(res.data.length > 0) {
        this.img = res.data[0].avatar
        this.isFadeIn = true
      } else {
        this.img =myImg
      }
    })
    .catch(err => console.log(err))
    }
  },
  created(){
  
  },
    beforeRouteUpdate(to, from, next){
     
  }
}
</script>

<style scoped>
/*@import '../../../assets/css/bootstrap.css'*/
/*@import '../../../assets/css/admin.css'*/
.login {
  position: fixed;

  width: 100%;
  height: 100%;

  background-color: #2f4050;
}

.login .login-wrap {
  position: relative;

  max-width: 380px;
  margin: 180px auto;
  padding: 100px 40px 40px;

  border-radius: 4px;
  background-color: #fff;
}

.login .login-wrap .avatar {
  position: absolute;
  top: -60px;
  left: 50%;

  overflow: hidden;

  width: 140px;
  height: 140px;
  margin-left: -70px;

  border: 10px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 5px #ccc;
}
.login {
  position: fixed;

  width: 100%;
  height: 100%;

  background-color: #2f4050;
}
.login .login-wrap {
  position: relative;

  max-width: 380px;
  margin: 180px auto;
  padding: 100px 40px 40px;

  border-radius: 4px;
  background-color: #fff;
}

.login .login-wrap .avatar {
  position: absolute;
  top: -60px;
  left: 50%;

  overflow: hidden;

  width: 140px;
  height: 140px;
  margin-left: -70px;

  border: 10px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 5px #ccc;
}
</style>