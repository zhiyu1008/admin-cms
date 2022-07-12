<template>
  <div id="app">
    <template v-if="menuList && !menuList.children">
      <el-menu-item :index="menuList.path">
        {{ menuList.meta.title }}
      </el-menu-item>
    </template>
    <template
      v-if="menuList && menuList.children && menuList.children.length > 0"
    >
      <el-submenu :index="menuList.path">
        <template #title>
          {{ menuList.meta.title }}
        </template>
        <SideBarMenuItem
          v-for="(childItem, index) in menuList.children"
          :menuList="childItem"
          :key="index"
        ></SideBarMenuItem>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  components: {},
  props: ['menuList'],
  data() {
    return {
      // menuList: []
    }
  },
  created() {
    // this.getMenus()
  },
  mounted() {},
  methods: {
    // getMenus() {
    //   this.menuList = this.$store.getters.nav.menus
    //   console.log(this.menuList)
    // }
  }
}
</script>
<style scoped lang="scss"></style>
