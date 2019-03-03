<template>
  <div class="mycarousel" id="abc">
      <div class="swipe">
        <swipe class="my-swipe">
          <swipe-item class="slide1"><img src="../../uploads/lunbo1.jpg"></swipe-item>
          <swipe-item class="slide2"><img src="../../uploads/lunbo4.jpg"></swipe-item>
          <swipe-item class="slide1"><img src="../../uploads/lunbo3.jpg"></swipe-item>
          <swipe-item class="slide2"><img src="../../uploads/lunbo5.jpg"></swipe-item>
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
<style>
  @import 'vue-swipe/dist/vue-swipe.css';

.my-swipe {
  height: 320px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.mycarousel{
  padding: 0 20px 0 20px;
  margin: 20px 300px 0 190px
}
</style>
