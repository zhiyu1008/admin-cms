<template>
  <div class="app">
    <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
      <template v-for="item in column">
        <el-form-item v-bind="item">
          <el-input
            v-bind="item"
            v-model.trim="searchInfo[item.prop]"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item class="addbtn">
          <el-button type="primary" icon="el-icon-edit" @click="handleAdd"
            >新增</el-button
          >
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    searchInfo: {
      type: Object,
      default: () => {}
    },
    column: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    // handleFormAction(action) {
    //   this.$emit('handleFormAction', action)
    // },
    handleSearch() {
      this.$emit('handleSearch', this.searchInfo)
    },
    handleAdd() {
      this.$emit('handleAdd')
    }
  }
}
</script>
<style scoped lang="scss">
.app {
  position: relative;
  .addbtn {
    position: absolute;
    right: 0;
  }
}
</style>
