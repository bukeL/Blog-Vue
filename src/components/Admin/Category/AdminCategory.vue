<template>

  <div class="main">
    <my-category></my-category>
  </div>
</template>

<script>
  import MyCategory from './Category.vue'
  export default {
  name: 'my-categories',
  data () {
    return {
    }
  },
   components:{
    'my-category':MyCategory
  }
}
</script>

<style scoped>

</style>