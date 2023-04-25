<template>
  <div id="app">
    <div class="bread-list">
      <el-breadcrumb>
        <el-breadcrumb-item style="font-size: 30px">
          xx平台审核列表页
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view></router-view>  
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
  },
  components: {
  }
}
</script>

<style scoped>
.bread-list {
  margin-top: 30px;
}
.bread-list /deep/ .el-breadcrumb__inner {
  padding-left: 20px;
  font-size: 30px;
  /* color: #fff; */
  font-weight: 700;
}
</style>
