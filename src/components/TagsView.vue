<template>
  <div class="tagsView">
    <ul class="tags-view-list">
      <li
        class="tags-view-item"
        @click="handleSelectTag(item.path)"
        :class="{ active: $route.path === item.path }"
        v-for="(item, index) in tagsView"
        :key="index"
      >
        {{ item.title }}
        <span @click.stop="handleCloseTag(index, item.path)" class="close"
          >x</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TagsView',
  data() {
    return {}
  },
  // 监听点击的页面的路由
  watch: {
    $route() {
      if (this.$route.meta && this.$route.meta.title && this.$route.path) {
        const obj = {
          title: this.$route.meta.title,
          path: this.$route.path
        }
        this.$store.commit('tagsview/setTagsView', obj)
      }
    },
    deep: true,
    immediate: true
  },
  created() {},
  computed: {
    // 获取tagsview的数据
    tagsView() {
      return this.$store.getters.tagsview
    }
  },
  methods: {
    handleSelectTag(path) {
      this.$router.push(path)
    },

    // tagsview的删除事件
    handleCloseTag(index, routePath) {
      // 如果点击首页不可以删除
      if (routePath === '/home') {
        return
      }
      let path = ''
      // 如果点击的是最后一个
      if (index === this.tagsView.length - 1) {
        // 如果最后一个不是第一个
        if (index !== 0) {
          // 如果点击的上一个存在，跳转路径就是上一项的路径，反之则跳转当前页面(也就是只有一个)
          path = this.tagsView[index - 1].path
            ? this.tagsView[index - 1].path
            : this.tagsView[index].path
        } else {
          // 如果最后一个是第一个（也就是只有一个）
          path = this.tagsView[index].path
          return
        }
        // 如果tagsview中不止一项
      } else if (this.tagsView.length !== 1) {
        // 跳转路径是下一项的路径
        path = this.tagsView[index + 1].path
      }
      this.$router.push(path)
      this.$store.commit('tagsview/removeTagsView', index)
    }
  }
}
</script>
<style scoped lang="scss">
.tagsView {
  width: 100%;
  overflow-x: auto;
  .tags-view-list {
    margin-bottom: 5px;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      background: #fff;
      border: 1px solid #e6a23c;
      color: #e6a23c;
      padding: 0 10px;
      font-size: 12px;
      margin-left: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        background-color: #e6a23c;
      }
      .close {
        display: inline-block;
        vertical-align: middle;
        width: 16px !important;
        height: 16px;
        position: relative;
        top: -7px;
      }
    }
  }
}
</style>
