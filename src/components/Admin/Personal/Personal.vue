
<template>
  <div class="main">
       <div class="container-fluid">
      <div class="page-title">
        <h1>我的个人资料</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">头像</label>
          <div class="col-sm-3">

            <label class="form-image">
              <p style="background-color: #eee;opacity: 0.9">原头像:</p>
              <img :src="myImg">
              <i class="mask fa fa-upload"></i>
            </label>
          </div>
          <div class="col-sm-3">
            更换头像:
            <input id="avatar" type="file" name="avatar" @change = "changeFile">
          </div>
        </div>
        <div class="form-group">
          <label for="email" class="col-sm-3 control-label">邮箱</label>
          <div class="col-sm-6">
            <input id="email" class="form-control" name="email" type="type" v-model="myEmail" placeholder="邮箱" readonly>
            <p class="help-block">登录邮箱不允许修改</p>
          </div>
        </div>
        <div class="form-group">
          <label for="slug" class="col-sm-3 control-label">别名</label>
          <div class="col-sm-6">
            <input id="slug" class="form-control" name="slug" type="type" v-model="mySlug" placeholder="slug">
          </div>
        </div>
        <div class="form-group">
          <label for="nickname" class="col-sm-3 control-label">昵称</label>
          <div class="col-sm-6">
            <input id="nickname" class="form-control" name="nickname" type="type" v-model="myNickname" placeholder="昵称">
            <p class="help-block">限制在 2-16 个字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="bio" class="col-sm-3 control-label">简介</label>
          <div class="col-sm-6">
            <textarea id="bio" class="form-control" placeholder="请输入简介" cols="30" rows="6" v-model="myBio"></textarea>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-6">
            <button type="button" class="btn btn-primary" @click="submitAdminInfo()">更新</button>
            <a class="btn btn-link" href="password-reset.html">修改密码</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import defaultImg from '../../../assets/img/default.png'
  export default {
  name: 'my-personal',
  data () {
    return {
      // id: 0,
      myAvatar:{},
      myImg: defaultImg,
      myEmail: '',
      mySlug: '',
      myNickname: '',
      myBio: ''
    }
  },
  methods:{
    getAdminInfo(){
      this.$axios.get('getAdminInfo')
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
         // console.log(res.data)
         // this.id = res.data.id
         this.myImg = res.data.avatar
         this.myEmail = res.data.email
         this.mySlug = res.data.slug
         this.myNickname = res.data.nickname
         this.myBio = res.data.bio
      })
      .catch(err => console.log(err))
    },
    submitAdminInfo(){
      // alert(1)
      var fd = new FormData()
      fd.append('avatar', this.myAvatar)
      fd.append('email', this.myEmail)
      fd.append('slug', this.mySlug)
      fd.append('nickname', this.myNickname)
      fd.append('bio', this.myBio)
      this.$axios.post('submitAdminInfo',fd,{
        headers: { "content-type": "multipart/form-data" }
      })
      .then(res => {
        // console.log(res.data)
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        if(res.data.code == 1){
          // console.log(this.myCatgory,this.myStatus,this.page)
        alert('修改个人信息成功')
        this.$store.commit("updateUserNickname",res.data.result[0].nickname)
        this.$store.commit("updateUserAvatar",res.data.result[0].avatar)
       this.$router.push({name:'AdminHome'})
                    // this.page = page + 1
                    }
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeFile: function (e) {
          //console.log(e.target.files[0])
          this.myAvatar = e.target.files[0]
        },
  },
  created(){
    this.getAdminInfo();
    // this.submitAdminInfo()
  },
    beforeRouteUpdate(to, from, next){
     
  }
}
</script>

<style scoped>
.main {
  position: relative;
  overflow: hidden;
  min-width: 844px;
  min-height: 100vh;
  margin: 70px 5px 20px 185px;
}
</style>