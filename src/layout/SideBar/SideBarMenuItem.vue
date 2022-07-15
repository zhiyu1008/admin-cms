<template>
  <div id="app">
    <template v-if="item && !item.children">
      <el-menu-item :index="item.path">
        <el-icon>
          <svg-icon :icon="item.meta.icon"></svg-icon>
        </el-icon>
        {{ item.meta.title }}
      </el-menu-item>
    </template>
    <template v-if="item && item.children && item.children.length > 0">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <svg-icon :icon="item.meta.icon"></svg-icon>
          </el-icon>
          {{ item.meta.title }}
        </template>
        <SideBarMenuItem
          v-for="(childItem, index) in item.children"
          :menuList="childItem"
          :key="index"
        ></SideBarMenuItem>
      </el-sub-menu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SideBarMenuItem',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  created() {
    // this.item = props.menuList
  },
  mounted() {},
  methods: {}
}
// import { defineProps } from 'vue'
</script>
<style scoped lang="scss"></style>
