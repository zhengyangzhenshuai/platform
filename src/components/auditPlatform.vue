<template>
  <div>
    我是重定向的
  </div>
</template>

<script>
export default {
  mounted() {
    this.$http.get('/list').then(res => {
      /* eslint-disable */
      console.log(res, this.$router)
    })
  },
}
</script>