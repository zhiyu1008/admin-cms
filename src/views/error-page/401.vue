<template>
  <div class="exception">
    <img
      src="https://img1.baidu.com/it/u=153269378,1555242931&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"
      alt=""
    />
    <el-button @click="goHome" class="btn-home">回首页</el-button>
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
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped lang="scss">
.exception {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }
  .btn-home {
    position: fixed;
    bottom: 100px;
    left: 50%;
    margin-left: -34px;
  }
}
</style>
