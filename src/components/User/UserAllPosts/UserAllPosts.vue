<template>
  <div>
    <my-all-posts></my-all-posts>
  </div>

</template>

<script>
  import AllPosts from './AllPosts.vue'
  export default {
  name: 'my-admin-home',
  data () {
    return {
    }
  },
  components:{
    'my-all-posts':AllPosts
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

</style>