<template>
  <fragment>
    <el-menu-item
      v-if="!item.children || (item.children && item.children.length <= 0)"
      :index="item.path === '/' ? '/index' : item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    <el-submenu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
      <MenuTree
        v-for="(childItem, index) in item.children"
        :key="index"
        :item="childItem"
      ></MenuTree>
    </el-submenu>
  </fragment>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
