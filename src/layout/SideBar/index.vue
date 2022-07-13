<template>
  <div class="container">
    <el-menu
      active-text-color="#e6a23c"
      background-color="#222d32"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      text-color="#fff"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/user"
            ><i class="el-icon-user"></i><span>用户管理</span></el-menu-item
          >
          <el-menu-item index="/system/role"
            ><i class="el-icon-user-solid"></i
            ><span>角色管理</span></el-menu-item
          >
          <el-menu-item index="/system/menu"
            ><i class="el-icon-menu"></i><span>菜单管理</span></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <!-- <SideBarMenu></SideBarMenu> -->
  </div>
</template>

<script>
// import SideBarMenu from './SideBarMenu'
export default {
  // components: { SideBarMenu },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
<!-- 静态菜单渲染 -->
<!-- <el-menu
      active-text-color="#e6a23c"
      background-color="#222d32"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      text-color="#fff"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/user"
            ><i class="el-icon-user"></i><span>用户管理</span></el-menu-item
          >
          <el-menu-item index="/system/role"
            ><i class="el-icon-user-solid"></i
            ><span>角色管理</span></el-menu-item
          >
          <el-menu-item index="/system/menu"
            ><i class="el-icon-menu"></i><span>菜单管理</span></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
