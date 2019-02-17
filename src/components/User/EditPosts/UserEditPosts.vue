 <template>
  <div class="main">
    <my-edit-post></my-edit-post>
    <!-- <my-hot></my-hot> -->
  </div>
</template>

<script>
  import EditPost from './EditPost.vue'
  export default {
  name: 'my-post',
  data () {
    return {
    }
  },
  components:{
    'my-edit-post':EditPost
  },
 
}
</script>

<style scoped>

</style>