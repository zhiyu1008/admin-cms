<template>
  <div class="aside-container">
    <el-menu
      :style="{ width: $store.getters.isCollapse ? '60px' : '200px' }"
      :default-active="activePath"
      text-color="#fff"
      background-color="#222d32"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      router
    >
      <MenuTree
        v-for="(item, index) in menus"
        :key="index"
        :item="item"
      ></MenuTree>
    </el-menu>
  </div>
</template>

<script>
import MenuTree from './MenuTree'
import { filterMenus } from '@/utils/menus'
export default {
  data() {
    return {}
  },
  computed: {
    activePath() {
      return this.$route.path
    },
    menus() {
      if (this.$store.getters.menus) {
        return filterMenus(this.$store.getters.menus)
      }
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  },
  components: {
    MenuTree
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.aside-container {
  width: auto;
}
.el-menu {
  border-right: none;
}
</style>

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
