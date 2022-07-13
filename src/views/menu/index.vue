<template>
  <div id="app">
    <!-- 搜索表单 -->
    <SearchForm
      :column="SearchFormColumn"
      :searchInfo="menuForm"
      @handleSearch="handleSearch"
      @handleAdd="handleAdd"
    ></SearchForm>
    <!-- 菜单列表 -->
    <el-table
      :data="menuList"
      style="width: 100%"
      border
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <!-- :tree-props="{ menuList: 'menuList', menuList: 'menuList' }" -->
      <el-table-column prop="id" label="序号" align="center"> </el-table-column>
      <el-table-column prop="name" label="展示名称" align="center">
      </el-table-column>
      <el-table-column prop="label" label="文件名称" align="center">
      </el-table-column>
      <el-table-column prop="path" label="路径" align="center">
      </el-table-column>
      <el-table-column prop="component" label="前端component" align="center">
      </el-table-column>
      <el-table-column prop="perm" label="唯一标识" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type === 2">按钮</el-tag>
          <el-tag v-if="scope.row.type === 1">菜单</el-tag>
          <el-tag type="success" v-if="scope.row.type === 0">目录</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        align="center"
        width="200"
      >
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
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tag type="success" class="tags" @click="handleEdit(scope.row.id)"
            >编辑</el-tag
          >
          <el-tag type="danger" @click="handleDel(scope.row.id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="menuForm.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="menuForm.size"
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
        <el-form-item label="类型" prop="type">
          <el-select v-model="dialogForm.type" placeholder="请选择类型">
            <el-option label="目录" value="list"></el-option>
            <el-option label="菜单" value="menu"></el-option>
            <el-option label="按钮" value="nutton"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" prop="fathMenu">
          <el-select v-model="dialogForm.fathMenu" placeholder="请选择父级菜单">
            <el-option label="目录" value="list"></el-option>
            <el-option label="菜单" value="menu"></el-option>
            <el-option label="按钮" value="nutton"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示名称" prop="label">
          <el-input
            v-model="dialogForm.label"
            placeholder="请输入展示名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="name">
          <el-input
            v-model="dialogForm.name"
            placeholder="请输入文件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input
            v-model="dialogForm.icon"
            placeholder="请输入图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="component" prop="component">
          <el-input
            v-model="dialogForm.component"
            placeholder="请输入component"
          ></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input
            v-model="dialogForm.path"
            placeholder="请输入component"
          ></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="perm">
          <el-input
            v-model="dialogForm.perm"
            placeholder="请输入唯一标识"
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
  </div>
</template>

<script>
import MenuApi from '../../api/menuApi'
import SearchForm from '@/components/SearchForm'
export default {
  components: { SearchForm },
  data() {
    return {
      menuForm: {
        current: 1,
        size: 10,
        name: ''
      },
      total: 20,
      menuList: [],
      status: false,
      SearchFormColumn: [
        {
          placeholder: '请输入菜单',
          label: '菜单',
          prop: 'name'
        }
      ],
      children: [],
      dialogVisible: false,
      dialogTitle: '新增菜单',
      rules: {
        name: [{ required: true, message: '请输入菜单', trigger: 'blur' }],
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
    this.getMenuList()
    this.$store.dispatch('user/getNav')
  },
  mounted() {},
  methods: {
    // 获取菜单列表 (菜单列表接口+菜单列表接口+nav接口)
    async getMenuList() {
      this.menuList = await MenuApi.getMenuList(this.menuForm)
      this.children = this.menuList.map((item) => {
        return item.children
      })
      console.log(this.children)
    },
    // 查询事件
    handleSearch(info) {
      this.menuForm.name = info.name
      this.menuForm.current = 1
      this.getMenuList()
    },
    // 删除事件
    handleDel(id) {
      this.$confirm('确定删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          MenuApi.delMenu(id)
          this.menuForm.current = 1
          this.getMenuList()
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
      this.dialogTitle = '新增菜单'
      this.dialogVisible = true
    },
    // 点击编辑按钮事件
    async handleEdit(id) {
      this.dialogTitle = '编辑菜单'
      this.dialogVisible = true
      try {
        this.dialogForm = await MenuApi.getMenu(id)
      } catch (error) {
        console.log(error)
      }
    },
    // 模态框确定事件
    handleAddOk() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (this.dialogTitle === '编辑菜单') {
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
        await MenuApi.addMenu(this.dialogForm)
        this.handleClose()
        this.getMenuList()
        this.$notify({
          title: '提示',
          message: '添加菜单成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '添加菜单失败', type: 'info' })
      }
    },
    // 实现编辑功能
    async handleEditSupplier() {
      try {
        await MenuApi.editMenu(this.dialogForm)
        this.handleClose()
        this.getmenuList()
        this.$notify({
          title: '提示',
          message: '编辑菜单成功',
          type: 'success'
        })
      } catch (error) {
        this.$notify({ title: '提示', message: '编辑菜单失败', type: 'info' })
      }
    },
    // 条数改变触发
    handleSizeChange(size) {
      this.menuForm.current = 1
      this.menuForm.size = size
      this.getMenuList()
    },
    // 页面改变触发
    handleCurrentChange(page) {
      this.menuForm.current = page
      this.getMenuList()
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
  padding-left: 700px;
}
</style>
