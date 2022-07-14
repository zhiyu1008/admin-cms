<template>
  <el-container id="app">
    <el-aside class="sidebar" width="auto">
      <SideBar></SideBar>
    </el-aside>
    <el-main class="main">
      <div class="navbar">
        <NavBar></NavBar>
      </div>
      <AppMain class="appmain"></AppMain>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from './SideBar'
import NavBar from './NavBar'
import AppMain from './AppMain'
import store from '@/store'
export default {
  components: {
    SideBar,
    NavBar,
    AppMain
  },
  data() {
    return {}
  },
  created() {
    store.dispatch('user/getUserInfo')
    store.dispatch('user/getNav')
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
#app {
  display: flex;
  align-items: center;
  height: 100%;
  .sidebar {
    height: 100%;
    background-color: $aside-bg-color;
    overflow-y: auto;
  }
  .main {
    height: 100%;
    .navbar {
      background-color: $header-bg-color;
      height: 60px;
    }
    .appmain {
      box-sizing: border-box;
      border: 20px solid #e6ebee;
      height: calc(100% - 60px);
      overflow: auto;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.el-main {
  padding: 0;
}
</style>
