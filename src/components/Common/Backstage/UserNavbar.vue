<template>
<div class="main">
  <nav class="navbar">
      <button class="btn btn-default navbar-btn fa fa-bars"></button>
      <ul class="nav navbar-nav navbar-right">
        <li><router-link :to = "{name:'Home'}"><i class="fa fa-user"></i>回首页瞅瞅</router-link></li>
        <li><router-link :to = "{name:'UserPersonal'}"><i class="fa fa-user"></i>个人中心</router-link></li>
        <li><a @click="logout"><i class="fa fa-user"></i>注销</a></li>
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
          this.$router.push({name:'Home'})
        }
          // this.$store.commit('updateUserId','')

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