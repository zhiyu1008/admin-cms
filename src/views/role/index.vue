<template>
  <div id="app">
    <!-- 搜索表单 -->
    <SearchForm
      :column="SearchFormColumn"
      :searchInfo="roleForm"
      @handleSearch="handleSearch"
      @handleAdd="handleAdd"
    ></SearchForm>
    <!-- 角色列表 -->
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="code" label="编码" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="描述" align="center" width="200">
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
      <el-table-column prop="createTime" label="创建时间" align="center">
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
            >分配权限</el-tag
          >
          <el-tag type="danger" @click="handleDel(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="roleForm.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="roleForm.size"
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
        <el-form-item label="角色" prop="name">
          <el-input
            v-model="dialogForm.name"
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="dialogForm.code"
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="dialogForm.remark"></el-input>
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
      v-model="dialogModel"
      title="分配权限"
      @on-ok="handleAssignPermissions"
    >
      <Tree
        :data="treeData"
        show-checkbox
        @on-check-change="getSelectedNodes"
      ></Tree>
    </Modal>
  </div>
</template>

<script>
import RoleApi from '../../api/roleApi'
import MenuApi from '../../api/menuApi'
import SearchForm from '@/components/SearchForm'
import { filterTreeData } from '@/views/role/utils/FilterTreeData'
export default {
  components: { SearchForm },
  data() {
    return {
      roleForm: {
        current: 1,
        size: 10,
        name: ''
      },
      total: 10,
      roleList: [],
      status: false,
      SearchFormColumn: [
        {
          placeholder: '请输入角色',
          label: '角色',
          prop: 'name'
        }
      ],
      dialogVisible: false,
      dialogTitle: '新增角色',
      rules: {
        name: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      dialogForm: {},
      dialogModel: false,
      treeData: [],
      PermissionsID: null
    }
  },
  created() {
    this.getRoleList()
    this.getMenuList()
    this.$store.dispatch('user/getNav')
  },
  mounted() {},
  methods: {
    // 获取角色列表 (角色列表接口+角色列表接口+nav接口)
    async getRoleList() {
      const response = await RoleApi.getRoleList(this.roleForm)
      this.roleList = response.records
      this.total = response.total
    },
    // 获取菜单列表
    async getMenuList() {
      await MenuApi.getMenuList(this.roleForm)
    },
    // 查询事件
    handleSearch(info) {
      this.roleForm.name = info.name
      this.roleForm.current = 1
      this.getRoleList()
    },
    // 删除事件
    handleDel(id) {
      this.$confirm('确定删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          RoleApi.delRole(id)
          this.roleForm.current = 1
          this.getRoleList()
          // this.$message.success('删除成功!')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 点击新增按钮事件
    handleAdd() {
      this.dialogForm = {
        status: 1
      }
      this.dialogTitle = '新增角色'
      this.dialogVisible = true
    },
    // 点击编辑按钮事件
    async handleEdit(id) {
      this.dialogTitle = '编辑角色'
      this.dialogVisible = true
      try {
        this.dialogForm = await RoleApi.getRole(id)
      } catch (error) {
        console.log(error)
      }
    },
    // 模态框确定事件
    handleAddOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (this.dialogTitle === '编辑角色') {
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
        await RoleApi.addRole(this.dialogForm)
        this.handleClose()
        this.getRoleList()
        this.$notify({
          title: '提示',
          message: '添加角色成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '添加角色失败', type: 'info' })
      }
    },
    // 实现编辑功能
    async handleEditSupplier() {
      try {
        await RoleApi.editRole(this.dialogForm)
        this.handleClose()
        this.getRoleList()
        this.$notify({
          title: '提示',
          message: '编辑角色成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '编辑角色失败', type: 'info' })
      }
    },
    // 点击分配权限事件
    async handleDistribution(row) {
      this.PermissionsID = row.id
      this.treeData = filterTreeData(this.$store.getters.menus)
      this.dialogModel = true
      console.log(row)
    },
    // 分配权限确定事件
    async handleAssignPermissions(params) {
      await RoleApi.assignRole(this.PermissionsID, params)
      this.getRoleList()
      this.$Message.success('分配成功！')
    },
    getSelectedNodes(data) {
      const arr = data.map((item) => item.id)
      this.handleAssignPermissions(arr)
    },
    // 条数改变触发
    handleSizeChange(size) {
      this.roleForm.current = 1
      this.roleForm.size = size
      this.getroleList()
    },
    // 页面改变触发
    handleCurrentChange(page) {
      this.roleForm.current = page
      this.getroleList()
    }
  }
}
</script>
<style scoped lang="scss">
#app {
  .tags {
    margin-right: 5px !important;
  }
}
.el-pagination {
  margin: 10px 0;
  box-sizing: border-box;
  padding-left: 800px;
}
</style>
<!-- <el-form
        :model="dialogForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="name">
          <el-input
            v-model="dialogForm.name"
            placeholder="请输入角色"
          ></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input
            v-model="dialogForm.code"
            placeholder="请输入编码"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="dialogForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form> -->
