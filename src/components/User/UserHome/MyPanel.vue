<template>
  <div class="main">
    <div class="container-fluid">
      <div class="jumbotron text-center">
        <h2>博客管理</h2>
        <br/>
        <br/>
        <br/>
        <p>昵称:{{showNcikname}}</p>
        <!-- <p><router-link class="btn btn-primary btn-lg" :to ="{name:'AddPosts'}" role="button">写文章</router-link></p> -->
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">个人博文统计：</h3>
            </div>
            <ul class="list-group">
              <li class="list-group-item"><strong>{{allPostNum}}</strong>篇文章（<strong>{{DraftedNum}}</strong>篇待审核 )</li>
              <!-- <li class="list-group-item"><strong></strong>个分类</li> -->
            </ul>
          </div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'my-panel',
  data () {
    return {
      allPostNum:0,
      DraftedNum:0,
    }
  },
  methods:{
    getUserPost(){
      this.$axios.get('getUserPost')
      .then(res => {
        if(res.data.code == -1){
          alert('请先登录')
          this.$router.push({name:'UserLogin'})
        }
        // console.log( res.data)
        this.allPostNum = res.data[0].num
      })
      .catch(err => console.log(err))
    },
    getUserDraftedNum(){
      this.$axios.get('getUserDraftedNum')
      .then(res => {
        // console.log( res.data)
        this.DraftedNum = res.data[0].num
      })
      .catch(err => console.log(err))
    }
  },
  created(){
    this.getUserPost()
    this.getUserDraftedNum()
  },
    computed:{
    showNcikname(){
       let nickname = window.localStorage.getItem('nickname')
        if(nickname){
          this.$store.commit('updateUserNickname',nickname)//同步操作
        }
      return this.$store.getters.getNickname
    }
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

.main .container-fluid .page-action {
  overflow: hidden;

  margin-bottom: 10px;
}

.main .container-fluid .page-action .btn-batch,
.main .container-fluid .page-action .form-inline {
  display: inline-block;
}

.main .container-fluid .page-action .btn {
  margin-right: 10px;
}

.main .container-fluid .pagination {
  margin: 0;
}


</style>