<template>
  <div id="app">
    <header>
      <router-link to="/audit-platform">审批中心</router-link>
    </header>
    <router-view></router-view>  
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    /* eslint-disable */ 
    console.log(this.$router, this.$route)
  },
  components: {
  }
}
</script>

<style>

</style>
