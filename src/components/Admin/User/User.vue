<template>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>用户</h1>
      </div>
      <div class="row">
        <div class="col-md-4">
          <form>
            <h4 class="myh4">{{mytitle}}</h4>
            <div class="form-group">
              <label for="email">邮箱</label>
              <input id="email" class="form-control" name="email" type="email" placeholder="邮箱" v-model="email">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug" v-model="slug">
            </div>
            <div class="form-group">
              <label for="nickname">昵称</label>
              <input id="nickname" class="form-control" name="nickname" type="text" placeholder="昵称" v-model="nickname">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input id="password" class="form-control" name="password" type="text" placeholder="密码" v-model="password">
            </div>
            <div class="form-group">
              <a class="btn btn-primary" type="submit" @click="insertUser(email,slug,nickname,password)" v-if="isExist">添加</a>
              <a class="btn btn-primary"  @click="submitEditUser(id,email,slug,nickname,password)" v-if="!isExist">提交修改</a>
              <a class="btn btn-primary"  @click="changeText" v-if="!isExist">回去添加</a>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
            <!-- show when multiple checked -->
            <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
               <tr>
                <th class="text-center" width="40"><input type="checkbox"></th>
                <th class="text-center" width="80">头像</th>
                <th>邮箱</th>
                <th>别名</th>
                <th>昵称</th>
                <!-- <th>状态</th> -->
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for = "(user,index) in users" :key="index">
                <td class="text-center"><input type="checkbox"></td>
                <td class="text-center"><img class="avatar" :src="user.avatar"></td>
                <td>{{user.email}}</td>
                <td>{{user.slug}}</td>
                <td>{{user.nickname}}</td>
                <!-- <td>激活</td> -->
                <td class="text-center">
                  <a  class="btn btn-default btn-xs" @click="editUser(user.id,user.email,user.slug,user.nickname,user.password)">编辑</a>
                  <a  class="btn btn-danger btn-xs" @click="deleteUser(user.id)">删除</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'my-category',
  data () {
    return {
      users: [],
      email:'',
      slug:'',
      nickname:'',
      password:'',
      mytitle:'添加新用户',
      isExist:true,
      id:0
    }
  },
  methods:{
    findAllUsers(){
      this.$axios.get('findAllUsers')
      .then(res => {
        console.log(res.data)
         this.users = res.data
      })
      .catch(err => console.log(err))
    },
    insertUser (email,slug,nickname,password) {
      this.$axios.post('insertUser',{params:{email:email,slug:slug,nickname:nickname,password:password}})
      .then(res => {
        if(res.data.affectedRows == 1) {
          this.email  = ''
          this.slug = ''
          this.nickname = ''
          this.password = ''
          this.findAllUsers()
      }
      })
      .catch(err => console.log(err))
    },
    deleteUser (id) {
      this.$axios.get('deleteUser',{params:{id:id}})
      .then(res => {
        if(res.data.affectedRows == 1) {
          this.findAllUsers()
      }
      })
      .catch(err => console.log(err))
    },
    editUser(id,email,slug,nickname,password){
      // console.log(id,name,slug)
      this.mytitle = '编辑用户信息'
      this.isExist = false
      this.email = email
      this.slug = slug
      this.id = id
      this.nickname = nickname
      this.password = password
    },
    changeText () {
      this.mytitle = '添加新用户'
      this.isExist = true
    },
    submitEditUser(id,email,slug,nickname,password) {
      // console.log(id,email,slug,nickname,password)
      this.$axios.post('updateUser',{params:{id:id,email:email,slug:slug,nickname:nickname,password:password}})
      .then(res => {
        // console.log(res)
        if(res.data.affectedRows == 1) {
          // this.serachAllCategories()
          this.changeText()
          this.findAllUsers()
          this.email = ''
          this.slug = ''
          this.nickname = ''
          this.password = ''
      }
      })
      .catch(err => console.log(err))
    }
  },
  created(){
  this.findAllUsers()
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