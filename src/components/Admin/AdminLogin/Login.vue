<template>
  <div class="admin">
    <div class="login">
    <form class="login-wrap">
      <img class="avatar" src="../../../assets/img/default.png">
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong> 用户名或密码错误！
      </div> -->
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" type="email" class="form-control" placeholder="邮箱" autofocus>
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" type="password" class="form-control" placeholder="密码">
      </div>
      <a class="btn btn-primary btn-block" href="index.html">登 录</a>
    </form>
  </div>
  </div>
</template>

<script>
  export default {
  name: 'Detail',
  data () {
    return {
    }
  },
  methods:{

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