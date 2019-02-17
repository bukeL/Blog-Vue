<template>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>写文章</h1>
      </div>
      <form class="row" id="myForm" method="post" enctype="multipart/form-data">
        <div class="col-md-9">
          <div class="form-group">
            <label for="title">标题</label>
            <input id="title" class="form-control input-lg" name="title" type="text" placeholder="文章标题" v-model="formObj.title">
          </div>
          <div class="form-group">
            <label for="content">标题</label>
            <textarea id="content" class="form-control input-lg" name="content" cols="30" rows="10" placeholder="内容" v-model="formObj.content"></textarea>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="slug">别名</label>
            <input id="slug" class="form-control" name="slug" type="text" placeholder="slug" v-model="formObj.slug">
            <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
          </div>
          <div class="form-group">
            <label for="feature">特色图像</label>
            <!-- show when image chose -->
            <img class="help-block thumbnail"  style="display: none">
            <input id="feature" class="form-control" name="feature" type="file" @change = "changeFile">
          </div>
          <div class="form-group">
            <label for="category">所属分类</label>
            <select id="category" class="form-control" name="category" v-model="formObj.category">
              <!-- <option value="1">未分类</option> -->
              <option v-for="(category,index) in categories" :key="index" :value="category.id">{{category.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="created">发布时间</label>
            <input id="created" class="form-control" name="created" type="datetime-local" v-model="formObj.created">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" class="form-control" name="status" v-model="formObj.status">
              <option value="未批准" selected>未批准</option>
              <!-- <option value="已发布">已发布</option> -->
            </select>
          </div>
          <div class="form-group">
            <a class="btn btn-primary" @click="submitForm">保存</a>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
  name: 'add-posts',
  data () {
    return {
      formObj:{
        title:'',
        content:'',
        slug:'',
        feature:{},
        category:'',
        created:'',
        status:'',
      },
      categories:[]
    }
  },
  methods:{
    submitForm(){
      // var form = document.getElementById('myForm')
      // var formData = new FormData(form)
      var fd = new FormData()
      fd.append('title', this.formObj.title)
      fd.append('content', this.formObj.content)
      fd.append('slug', this.formObj.slug)
      fd.append('feature', this.formObj.feature)
      fd.append('category', this.formObj.category)
      fd.append('created', this.formObj.created)
      fd.append('status', this.formObj.status)
      // var title = formData.get('title')
      // console.log(fd)
      this.$axios.post('addPosts',fd,{
        headers: { "content-type": "multipart/form-data" }
      })
      .then(res => {
        if(res.data.code == -1){
          // alert('请先登录')
          this.$router.push({name:'AdminLogin'})
        }
        if(res.data.affectedRows == 1){
          // console.log(this.myCatgory,this.myStatus,this.page)
        alert('添加文章成功')
       this.$router.push({name:'UserAllPosts'})
                    // this.page = page + 1
                    }
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeFile: function (e) {
          //console.log(e.target.files[0])
          this.formObj.feature = e.target.files[0]
        },
    serachAllCategories(){
      this.$axios.get('allCategories')
      .then(res => {
        this.categories =res.data
        // console.log(res.data)
        // console.log(this.categories)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.serachAllCategories()
  },
  beforeRouteUpdate(to,from,next){

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