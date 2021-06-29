<template>
  <div id="nav">
    <router-view></router-view>
  </div>
</template>
<script>
  import Login from './Login.vue'
  import Index from './views/Index.vue'
  export default {
    components: {
      Login,
      Index
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
