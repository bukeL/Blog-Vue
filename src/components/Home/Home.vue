<template>
  <div class="wrapper">
    <!-- <div class="content"> -->
      <my-carousel/>
      <my-rank/>
      <my-hot/>
      <my-article/>
    <!-- </div> -->

  </div>
</template>

<script>
  import MyCarousel from './MyCarousel.vue'
  import MyRank from './MyRank.vue'
  import MyArticle from './MyArticle.vue'
  export default {
    name: 'home',
    components:{
      'my-carousel': MyCarousel,
      'my-rank': MyRank,
      'my-article': MyArticle
    },
    created: function(){
      
    }

  }
</script>

<style>

</style>