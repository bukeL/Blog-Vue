<template>
  <div class="aside">
    <div class="profile">
      <img class="avatar" :src="myImg">
      <h3 class="name">{{adminName}}</h3>
    </div>
    <ul class="nav">
      <li :class="show==1?active:''"  @click ="ybShow">
        <router-link :to = "{name:'AdminHome'}"><i class="fa fa-dashboard"></i>仪表盘</router-link>
      </li>
      <li :class="(show==2||show==3||show==4)?active:''">
        <a @click="changeIsShow"  data-toggle="collapse" >
          <i class="fa fa-thumb-tack"></i>文章<i class="fa fa-angle-right"></i>
        </a>
        <ul  v-show ="isShow">
          <li @click ="allpShow" :class="show==2?active:''"><router-link :to = "{name:'AllPosts'}">所有文章</router-link></li>
          <li @click ="writeShow" :class="show==3?active:''"><router-link :to = "{name:'AddPosts'}">写文章</router-link></li>
          <li @click ="cateShow" :class="show==4?active:''"><router-link :to = "{name:'Category'}">分类目录</router-link></li>
        </ul>
      </li>
      <li @click ="userShow" :class="show==5?active:''">
        <router-link :to = "{name:'AdminUser'}" ><i class="fa fa-users"></i>用户</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // import myImg from '@/assets/img/default.png'
  // import EventBus from '@/EventBus.js'
  export default {
  name: 'my-aside',
  methods:{
    ybShow(){
      
      this.show =1
      // alert(this.show)
    },
    allpShow(){
      this.show =2
    },
     writeShow(){
      this.show =3
    },
     cateShow(){
      this.show =4
    },
     userShow(){
      this.show =5
    },
  changeIsShow(e) {
    this.isShow = !this.isShow
    // alert(this.isShow)
     // console.log(e.target)
  }
  },
  // created(){ 
  //   EventBus.$on('sendAvatar',function(data) { //this指向有问题,选用箭头函数
  //     console.log(data)
  //     console.log(this) //指向eventbus
  //     this.img = data
  //   })
  // },
   data () {
    return {
      isShow:false,
      show:0,
      active:'active',
      myImg:'url',
      adminName:''
    }
  },
  created(){
    // this.$nextTick(function(){
    //    EventBus.$on('sendAvatar',data => {
    //   console.log(data)
    //   this.img = data.avatar
    // })
    // })
    this.myImg = this.$route.params.avatar
    this.adminName = this.$route.params.nickname
     // console.log(this.$route)
    // console.log(this.myImg)
      
  },
  watch:{
    $route(to,from,next){
      // next()
    }
  }
}
</script>

<style scoped>
 .aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
  background-color: #2f4050;
}

 .aside .profile {
  padding: 25px;
  height: 177px;
  text-align: center;

  background-color: #243443;
}
 .aside .profile img {
  margin-left: 25px
 }
 .aside .profile h3 {
  margin: 20px 0 10px 0
 }
 .aside .profile .avatar {
  width: 80px;
  height: 80px;
  border: 3px solid rgba(255, 255, 255, .3);
  border-radius: 50%;
  object-fit: cover;
}

 .aside .profile .name {
  color: #a9b0c2;

  font-size: 16px;
}

 .aside .nav {
  padding: 10px 0;
}

 .aside .nav li + li {
  margin-top: 1px;
}

 .aside .nav a {
  display: block;

  padding: 10px 20px;

  color: #a9b0c2;
}

 .aside .nav .active > a {
  color: #f6f6f6;
  background-color: #243443;
}

 .aside .nav a:hover,
 .aside .nav a:focus {
  color: #f6f6f6;
  background-color: #213140;
}

 .aside .nav a i:first-child {
  width: 14px;
  margin-right: 10px;

  font-size: 14px;
  line-height: 16px;
}

 .aside .nav .fa-angle-right {
  float: right;

  transition: transform .2s;
  transform: rotate(90deg);

  font-size: 16px;
  line-height: 20px;
}

 .aside .nav .collapsed .fa-angle-right {
  float: right;

  transform: rotate(0);
}

 .aside .nav a + ul {
  overflow: hidden;

  padding: 0;

  list-style: none;

  background-color: #243443;
  box-shadow: inset 0 1px 3px #111e29;

  font-size: .9em;
}

 .aside .nav a + ul li:first-child {
  margin-top: 8px;
}

 .aside .nav a + ul li:last-child {
  margin-bottom: 8px;
}

 .aside .nav a + ul a {
  padding-left: 30px;
}
</style>