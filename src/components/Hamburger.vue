<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$route.path === '/index'">
      <el-breadcrumb-item>控制台</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      v-if="this.$route.path !== '/index'"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="(item, index) in $route.matched">
        <el-breadcrumb-item :to="{ path: item.path }" :key="index">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.home {
  font-weight: 700;
}
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
