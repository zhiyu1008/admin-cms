<template>
  <div id="app">
    <!-- 搜索表单 -->
    <SearchForm
      :column="SearchFormColumn"
      :searchInfo="userForm"
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
          <el-tag type="success" class="tags" @click="handleEdit(scope.row.id)"
            >编辑</el-tag
          >
          <el-tag
            type="warning"
            class="tags"
            @click="handleDistribution(scope.row)"
            >分配角色</el-tag
          >
          <el-tag type="danger" @click="handleDel(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userForm.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="userForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avatar">
          <template>
            <img class="addimg" :src="dialogForm.avatar" alt="" />
          </template>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="dialogForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="dialogForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="dialogForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="handleAddOk">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分类权限 -->
    <Modal
      v-model="dialogActionModel"
      title="分配角色"
      @on-ok="assignPermissions"
    >
      <Select v-model="selectValue" :max-tag-count="2" multiple>
        <Option
          v-for="item in selectRoleList"
          :key="item.value"
          :value="item.id"
          >{{ item.name }}</Option
        >
      </Select>
    </Modal>
  </div>
</template>

<script>
import RoleApi from '../../api/roleApi'
import UserApi from '../../api/userApi'
import SearchForm from '@/components/SearchForm'
export default {
  components: { SearchForm },
  data() {
    return {
      userForm: {
        current: 1,
        size: 10,
        username: ''
      },
      total: 10,
      userList: [],
      status: false,
      SearchFormColumn: [
        {
          placeholder: '请输入用户名',
          label: '用户名',
          prop: 'username'
        }
      ],
      dialogVisible: false,
      dialogTitle: '新增用户',
      rules: {
        avatar: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        status: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      dialogForm: {},
      dialogActionModel: false,
      selectValue: [],
      permissionId: null,
      selectRoleList: []
    }
  },
  created() {
    this.getUserList()
    this.$store.dispatch('user/getNav')
    this.getRoleList()
  },
  mounted() {},
  methods: {
    // 获取用户列表 (用户列表接口+角色列表接口+nav接口)
    async getUserList() {
      const response = await UserApi.getUserList(this.userForm)
      this.userList = response.records
      this.total = response.total
    },
    // 获取角色列表
    async getRoleList() {
      await RoleApi.getRoleList(this.userForm)
    },
    // 查询事件
    handleSearch(info) {
      this.userForm.username = info.username
      this.userForm.current = 1
      this.getUserList()
    },
    // 删除事件
    handleDel(id) {
      this.$confirm('确定删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          UserApi.delUser(id)
          this.userForm.current = 1
          this.getUserList()
          // this.$message.success('删除成功!')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 点击新增按钮事件
    handleAdd() {
      this.dialogForm = {
        status: 1,
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      }
      this.dialogTitle = '新增用户'
      this.dialogVisible = true
    },
    // 点击编辑按钮事件
    async handleEdit(id) {
      this.dialogTitle = '编辑用户'
      this.dialogVisible = true
      try {
        this.dialogForm = await UserApi.getUser(id)
      } catch (error) {
        console.log(error)
      }
    },
    // 模态框确定事件
    handleAddOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (this.dialogTitle === '编辑用户') {
            this.handleEditSupplier()
          } else {
            this.handleAddSupplier()
          }
          // this.$refs['ruleForm'].handleClose()
        } else {
          return false
        }
      })
    },
    // 关闭添加·模态框
    handleClose() {
      this.dialogVisible = false
    },
    // 实现添加功能
    async handleAddSupplier() {
      try {
        await UserApi.addUser(this.dialogForm)
        this.handleClose()
        this.getUserList()
        this.$notify({
          title: '提示',
          message: '添加用户成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '添加用户失败', type: 'info' })
      }
    },
    // 实现编辑功能
    async handleEditSupplier() {
      try {
        await UserApi.editUser(this.dialogForm)
        this.handleClose()
        this.getUserList()
        this.$notify({
          title: '提示',
          message: '编辑用户成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '编辑用户失败', type: 'info' })
      }
    },
    // 点击分配权限事件
    async handleDistribution(row) {
      this.selectValue = row.roles.map((item) => item.id)
      const res = await RoleApi.getRoleList(this.userForm)
      this.selectRoleList = res.records
      this.permissionId = row.id
      if (res.records) {
        this.dialogActionModel = true
      }
    },
    // 分配权限确定事件
    async assignPermissions() {
      await UserApi.assignUser(this.permissionId, this.selectValue)
      this.$message.success('分配成功！')
    },
    // 条数改变触发
    handleSizeChange(size) {
      this.userForm.current = 1
      this.userForm.size = size
      this.getUserList()
    },
    // 页面改变触发
    handleCurrentChange(page) {
      this.userForm.current = page
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
  box-sizing: border-box;
  padding-left: 700px;
}
.addimg {
  width: 70px;
  height: 70px;
  border-radius: 35px;
}
</style>
<!-- 用户管理模态框 -->
<!-- <el-form
        :model="dialogForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avatar">
          <template>
            <img class="addimg" :src="dialogForm.avatar" alt="" />
          </template>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="dialogForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="dialogForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="dialogForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form> -->
