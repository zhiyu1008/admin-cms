<template>
  <div id="app">
    <SearchForm
      :column="SearchFormColumn"
      :searchInfo="searchInfo"
      @handleSearch="handleSearch"
      @handleAdd="handleAdd"
    ></SearchForm>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm'
export default {
  components: { SearchForm },
  data() {
    return {
      SearchFormColumn: [
        {
          placeholder: '请输入菜单',
          label: '菜单'
        }
      ],
      searchInfo: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 查询事件
    handleSearch(info) {
      alert(JSON.stringify(info))
    },
    // 点击新增事件
    handleAdd() {
      alert('add')
    }
  }
}
</script>
<style scoped lang="scss"></style>
