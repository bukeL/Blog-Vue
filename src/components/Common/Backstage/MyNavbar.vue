<template>
<div class="main">
  <nav class="navbar">
      <button class="btn btn-default navbar-btn fa fa-bars"></button>
      <ul class="nav navbar-nav navbar-right">
        <li><router-link :to = "{name:'Personal'}"><i class="fa fa-user"></i>个人中心</router-link></li>
        <li><a href="login.html"><i class="fa fa-sign-out"></i>退出</a></li>
      </ul>
    </nav>
</div>
</template>

<script>
  export default {
  name: 'my-navbar',
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
.main .navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 180px;

  padding: 0 15px 0 10px;

  border: 0;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  background-color: #fff;
}

.main .navbar .navbar-btn {
  padding: 10px 12px;

  color: #444;
  border: 0;
}

.main .navbar i {
  margin-right: 4px;

  font-size: .8em;
}
</style>