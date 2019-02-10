<template>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>分类目录</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="row">
        <div class="col-md-4">
          <form>
            <h4 class="myh4">{{mytitle}}</h4>
            <div class="form-group">
              <label for="name">名称</label>
              <input id="name" class="form-control" name="name" type="text" placeholder="分类名称" v-model="name">
            </div>
            <div class="form-group">
              <label for="slug">别名</label>
              <input id="slug" class="form-control" name="slug" type="text" placeholder="slug" v-model="slug">
            </div>
            <div class="form-group">
              <a class="btn btn-primary"  @click="insertCategory(name,slug)" v-if="isExist">添加</a>
              <a class="btn btn-primary"  @click="submitCategory(id,name,slug)" v-if="!isExist">提交修改</a>
              <a class="btn btn-primary"  @click="changeText" v-if="!isExist">回去添加</a>
            </div>
          </form>
        </div>
        <div class="col-md-8">
          <div class="page-action">
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th class="text-center" width="40"><input type="checkbox"></th>
                <th>名称</th>
                <th>Slug</th>
                <th class="text-center" width="100">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category,id) in categories" :key="id">
                <td class="text-center"><input type="checkbox"></td>
                <td>{{category.name}}</td>
                <td>{{category.slug}}</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-info btn-xs" @click="editCategory(category.id,category.name,category.slug)">编辑</a>
                  <a href="javascript:;" class="btn btn-danger btn-xs" @click="deleteCategory(category.id)">删除</a>
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
      categories:[],
      name:'',
      slug:'',
      mytitle:'添加新分类目录',
      isExist:true,
      id:0
    }
  },
  methods:{
    serachAllCategories(){
      this.$axios.get('allCategories')
    .then(res => {
      if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
      this.categories =res.data
      console.log(res.data)
      // console.log(this.categories)
    })
    .catch(err => {
      console.log(err)
    })
    },
    insertCategory (name,slug) {
      this.$axios.get('insertCategory',{params:{name:name,slug:slug}})
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        // console.log(res.data)
        if(res.data.affectedRows == 1) {
        this.name =''
        this.slug=''
        this.serachAllCategories()
      }
      })
      .catch(err => console.log(err))
    },
    deleteCategory (id) {
      this.$axios.get('deleteCategory',{params:{id:id}})
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        if(res.data.affectedRows == 1) {
          this.serachAllCategories()
      }
      })
      .catch(err => console.log(err))
    },
    editCategory(id,name,slug){
      console.log(id,name,slug)
      this.mytitle = '编辑分类目录'
      this.isExist = false
      this.name = name
      this.slug = slug
      this.id = id
    },
    changeText () {
      this.mytitle = '添加分类目录'
      this.isExist = true
    },
    submitCategory(id,name,slug) {
      this.$axios.get('updateCategory',{params:{id:id,name:name,slug:slug}})
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        // console.log(res)
        if(res.data.affectedRows == 1) {
          // this.serachAllCategories()
          this.changeText()
          this.serachAllCategories()
          this.name = ''
          this.slug = ''
      }
      })
      .catch(err => console.log(err))
    }
  },
  created(){
    this.serachAllCategories()
  },
    beforeRouteUpdate(to, from, next){
     // alert(1)
     //做不到,需要采用监听的方式
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