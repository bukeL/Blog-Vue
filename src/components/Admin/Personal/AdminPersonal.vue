<template>

  <div class="main">
    <my-personal></my-personal>
  </div>
</template>

<script>
  import MyPersonal from './Personal.vue'
  export default {
  name: 'my-personals',
  data () {
    return {
    }
  },
   components:{
    'my-personal':MyPersonal
  }
}
</script>

<style scoped>

</style>