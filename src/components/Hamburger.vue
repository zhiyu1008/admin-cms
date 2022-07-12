<template>
  <div>
    <p v-if="this.$route.path === '/home'" class="home">控制台</p>
    <el-breadcrumb separator="/" v-if="this.$route.path !== '/home'">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <template v-for="(item, index) in $route.matched">
        <el-breadcrumb-item :to="{ path: item.path }" :key="index">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
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
