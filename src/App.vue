<template>
  <div >
  	<router-view name = 'left'></router-view>
  	<router-view name = 'right'></router-view>
    <router-view name = 'main'></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
