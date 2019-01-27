<template>
      <div class="panel hots">
        <h3>热门推荐</h3>
        <ul>
          <li v-for = "(post,id) in hotPosts" :key = "id">
            <router-link :to = "{name:'Detail',query:{id:post.id}}">
              <img :src="post.feature" :alt="post.title">
              <span>{{post.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name: 'my-hot',
  data () {
    return {
     hotPosts:[]
    }
  },
    created () {
      this.$axios.get('myHot')
      .then(res => {
         this.hotPosts =res.data.sort(()=>0.5-Math.random()).slice(0,5)
         // console.log(this.hotPosts)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hots{
  padding: 0 20px;
  margin: 20px 15px 0 210px
}
.hots ul {
  font-size: 0;
  margin-bottom: 0;
}

.hots li {
  display: inline-block;
  width: 18.9%;
  font-size: 14px;
  overflow: hidden;
}

.hots li + li {
  margin-left: 1.33333333333333%;
}

.hots li a {
  color: #666;
}

.hots li a:hover {
  color: #ff5e52;
}

.hots li img {
  height: 142px;
  margin-bottom: 5px;
}

.hots li span {
  display: inline-block;
  height: 40px;
  overflow: hidden;
}
</style>
