<template>

  <div class="main">
    <my-user></my-user>
  </div>
</template>

<script>
  import MyUser from './User.vue'
  export default {
  name: 'my-users',
  data () {
    return {
    }
  },
   components:{
    'my-user':MyUser
  }
}
</script>

<style scoped>

</style>