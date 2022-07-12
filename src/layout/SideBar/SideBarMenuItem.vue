<template>
  <div id="app">
    <!-- <template v-if="menuList && !menuList.children">
      <el-menu-item :index="menuList.path">
        <el-icon>
        <svg-icon :icon="menuList.meta.icon"></svg-icon>
      </el-icon>
        {{ menuList.meta.title }}
      </el-menu-item>
    </template>
    <template
      v-if="menuList && menuList.children && menuList.children.length > 0"
    >
      <el-submenu :index="menuList.path">
        <template #title>
          <el-icon>
          <svg-icon :icon="menuList.meta.icon"></svg-icon>
        </el-icon>
          <el-icon><Setting /></el-icon>
          {{ menuList.meta.title }}
        </template>
        <SideBarMenuItem
          v-for="(childItem, index) in menuList.children"
          :menuList="childItem"
          :key="index"
        ></SideBarMenuItem>
      </el-submenu>
    </template> -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <span slot="title">控制台</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">菜单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  components: {},
  // props: ['menuList'],
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss"></style>
