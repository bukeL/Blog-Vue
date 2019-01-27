<template>
  <div class="carousel" id="abc">
      <div class="swipe">
        <swipe class="my-swipe">
          <swipe-item class="slide1"><img src="../../uploads/slide_1.jpg"></swipe-item>
          <swipe-item class="slide2"><img src="../../uploads/slide_2.jpg"></swipe-item>
          <swipe-item class="slide1"><img src="../../uploads/slide_1.jpg"></swipe-item>
          <swipe-item class="slide2"><img src="../../uploads/slide_2.jpg"></swipe-item>
      </swipe>
      </div>
  </div>
</template>

<script>
export default {
  name: 'my-carousel',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import 'vue-swipe/dist/vue-swipe.css';

.my-swipe {
  height: 300px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.carousel{
  padding: 0 20px 0 20px;
  margin: 20px 300px 0 190px
}
</style>
