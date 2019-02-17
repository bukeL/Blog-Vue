<template>
  <div class="main">
    <div class="container-fluid">
      <div class="page-title">
        <h1>所有文章</h1>
        <router-link :to="{name:'AddPosts'}" class="btn btn-primary btn-xs">写文章</router-link>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <a class="btn btn-danger btn-sm" href="javascript:;" style="display: none">批量删除</a>
        <form class="form-inline">
          <select name="" class="form-control input-sm">
            <option value="">所有分类</option>
            <option value="">未分类</option>
          </select>
          <select name="" class="form-control input-sm">
            <option value="">所有状态</option>
            <option value="">草稿</option>
            <option value="">已发布</option>
          </select>
          <button class="btn btn-default btn-sm">筛选</button>
        </form>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th class="text-center">发表时间</th>
            <th class="text-center">状态</th>
            <th class="text-center" width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>随便一个名称</td>
            <td>小小</td>
            <td>潮科技</td>
            <td class="text-center">2016/10/07</td>
            <td class="text-center">已发布</td>
            <td class="text-center">
              <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
              <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  export default {
  name: 'all-posts',
    data () {
    return {

    }
  },
  methods:{
   
  },
  created(){
 
  },
  watch:{
   
  }
}
</script>

<style scoped>
.noPost{
  font-size: 40px;
  text-align: center;
}
.load{
  height: 30px;
  line-height: 20px;
  font-size: 20px;
  color: skyblue;
  text-align:center;
}
.underscore{
  height: 30px;
  line-height: 20px;
  font-size: 20px;
  color: skyblue;
  text-align:center;
}
.load:hover{
  color: blue;
  cursor:pointer
}
.main {
  position: relative;

  overflow: hidden;

  min-width: 844px;
  min-height: 100vh;
  margin: 70px 5px 20px 185px;
}
.main .container-fluid .page-title {
  overflow: hidden;

  margin-bottom: 20px;
}

.main .container-fluid .page-title h1 {
  display: inline-block;

  margin: 0;

  font-size: 24px;
  font-weight: 400;
}

.main .container-fluid .page-title .btn-primary {
  margin-left: 5px;

  vertical-align: bottom;
}

.main .container-fluid .page-title .input-group {
  max-width: 230px;
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

.main .container-fluid form h2 {
  margin-top: 5px;
  margin-bottom: 15px;

  font-size: 17px;
  font-weight: 400;
}

.main .container-fluid table {
  background-color: #fff;
}

.main .container-fluid th {
  border-bottom: 1px;

  font-weight: 400;
}

.main .container-fluid td {
  vertical-align: middle;
}

.main .container-fluid td .avatar {
  width: 40px;

  border-radius: 50%;
}

.main .container-fluid td .slide {
  width: auto;
  max-height: 80px;
}

.main .container-fluid td i {
  margin-right: 5px;
}

.main .container-fluid label {
  color: #555;

  font-weight: normal;
}

.main .container-fluid textarea {
  resize: vertical;
}

.main .container-fluid .editor-toolbar:before {
  margin-bottom: 5px;
}

.main .container-fluid .editor-toolbar:after {
  margin-top: 5px;
}

.main .container-fluid .form-horizontal {
  margin-top: 50px;
}

.main .container-fluid .form-image {
  position: relative;

  background-color: #fff;
}

.main .container-fluid .form-image input {
  display: none;
}

.main .container-fluid .form-image img {
  max-width: 150px;
}

.main .container-fluid .form-image i {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: opacity .3s;
  text-align: center;

  opacity: 0;
  background: #c0c0c0;

  font-size: 2em;
}

.main .container-fluid .form-image i::before {
  position: absolute;
  top: 50%;
  left: 50%;

  margin-top: -14px;
  margin-left: -14px;
}

.main .container-fluid .form-image:hover i {
  opacity: .6;
}

.main .container-fluid .thumbnail {
  width: 100%;
}
</style>