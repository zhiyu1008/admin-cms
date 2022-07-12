<template>
  <div id="app">
    <!-- 搜索表单 -->
    <SearchForm
      :column="SearchFormColumn"
      :searchInfo="searchInfo"
      @handleSearch="handleSearch"
      @handleAdd="handleAdd"
    ></SearchForm>
    <!-- 用户列表 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" align="center">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" align="center">
        <template slot-scope="scope">
          <template v-for="item in scope.row.roles">
            <el-tag>{{ item.name }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="200">
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope"
          ><el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-tag type="success" class="tags" @click="handleEdit(scope.id)"
            >编辑</el-tag
          >
          <el-tag
            type="warning"
            class="tags"
            @click="handleDistribution(scope.id)"
            >分配角色</el-tag
          >
          <el-tag type="danger" @click="handleDel(scope.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchInfo.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import UserApi from '../../api/userApi'
import RoleApi from '../../api/roleApi'
import User from '../../api/user'
import SearchForm from '@/components/SearchForm'
export default {
  components: { SearchForm },
  data() {
    return {
      searchInfo: {
        current: 1,
        size: 10,
        username: ''
      },
      total: 10,
      roleInfo: {
        current: 1,
        size: 50
      },
      userList: [],
      status: false,
      SearchFormColumn: [
        {
          placeholder: '请输入用户名',
          label: '用户名'
        }
      ]
    }
  },
  created() {
    this.getUserList()
    this.getNav()
    this.getRoleList()
  },
  mounted() {},
  methods: {
    // 获取用户列表 (用户列表接口+角色列表接口+nav接口)
    async getUserList() {
      const response = await UserApi.getUserList(this.searchInfo)
      this.userList = response.records
      this.total = response.total
    },
    // 获取nav
    async getNav() {
      await User.getNav()
    },
    // 获取角色列表
    async getRoleList() {
      await RoleApi.getRoleList(this.roleInfo)
    },
    // 查询事件
    handleSearch(info) {
      alert(JSON.stringify(info))
    },
    // 点击新增事件
    handleAdd() {
      alert('add')
    },
    // 编辑事件
    handleEdit() {},
    // 分配权限事件
    handleDistribution() {},
    // 删除事件
    handleDel() {},
    // 条数改变触发
    handleSizeChange(size) {
      this.searchInfo.current = 1
      this.searchInfo.size = size
      this.getUserList()
    },
    // 页面改变触发
    handleCurrentChange(page) {
      this.searchInfo.current = page
      this.getUserList()
    }
  }
}
</script>
<style scoped lang="scss">
#app {
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }
  .tags {
    margin-right: 5px !important;
  }
}
.el-pagination {
  margin: 10px 0;
}
</style>
