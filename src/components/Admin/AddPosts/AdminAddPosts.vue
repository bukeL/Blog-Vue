 <template>
  <div class="main">
    <my-add-post></my-add-post>
    <!-- <my-hot></my-hot> -->
  </div>
</template>

<script>
  import AddPost from './AddPost.vue'
  export default {
  name: 'my-post',
  data () {
    return {
    }
  },
  components:{
    'my-add-post':AddPost
  },
 
}
</script>

<style scoped>

</style>