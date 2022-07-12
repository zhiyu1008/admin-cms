<template>
  <div id="app">
    <SideBar class="sidebar"></SideBar>
    <div class="main">
      <div class="navbar">
        <NavBar></NavBar>
      </div>
      <AppMain class="appmain"></AppMain>
    </div>
  </div>
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
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar {
    width: 200px;
    height: 100%;
    background-color: $aside-bg-color;
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .main {
    width: calc(100% - 200px);
    margin-left: 210px;
    position: relative;
    .navbar {
      background-color: $header-bg-color;
      width: calc(100% - 200px);
      position: fixed;
      top: 0;
      right: 0;
      z-index: 999;
      height: 60px;
    }
    .appmain {
      box-sizing: border-box;
      // padding: 20px;
      border: 20px solid #e6ebee;
      position: fixed;
      bottom: 0;
      right: 0;
      width: calc(100% - 200px);
      height: calc(100% - 60px);
      z-index: 999;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
