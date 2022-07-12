<template>
  <div class="container">
    <div class="nav">
      <Hamburger></Hamburger>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
export default {
  components: { Hamburger },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.nav {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
