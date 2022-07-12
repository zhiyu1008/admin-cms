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
      userInfo: {
        current: 1,
        size: 10,
        username: ''
      },
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
      ],
      searchInfo: {}
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
      const response = await UserApi.getUserList(this.userInfo)
      this.userList = response.records
      // console.log(this.userList)
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
    handleDel() {}
  }
}
</script>
<style scoped lang="scss">
#app {
  padding: 20px;
  box-sizing: border-box;
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }
  .tags {
    margin-right: 5px !important;
  }
}
</style>
