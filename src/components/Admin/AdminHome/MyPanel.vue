<template>
  <div class="main">
    <div class="container-fluid">
      <div class="jumbotron text-center">
        <h1>One Belt, One Road</h1>
        <p>Thoughts, stories and ideas.</p>
        <p><router-link class="btn btn-primary btn-lg" :to ="{name:'AddPosts'}" role="button">写文章</router-link></p>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">站点内容统计：</h3>
            </div>
            <ul class="list-group">
              <li class="list-group-item"><strong>10</strong>篇文章（<strong>2</strong>篇草稿）</li>
              <li class="list-group-item"><strong>6</strong>个分类</li>
              <li class="list-group-item"><strong>5</strong>条评论（<strong>1</strong>条待审核）</li>
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