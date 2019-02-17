<template>
  <div class="main">
    <my-panel></my-panel>
  </div>

</template>

<script>
  import MyPanel from './MyPanel.vue'
  export default {
  name: 'my-admin-home',
  data () {
    return {
    }
  },
  components:{
    'my-panel':MyPanel
  },
  methods:{

  },
  created(){
    // console.log(this.$route.params)
    // alert(this.$route.params.id)
  },
    beforeRouteUpdate(to, from, next){
     
  }
}
</script>

<style scoped>

</style>