<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Inventory</el-breadcrumb-item>
      <el-breadcrumb-item>Inventory Management</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="8">
            <el-input placeholder="Search" v-model="query.vname" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectInvenList()"></el-button>
            </el-input>
          </el-col>
           <el-col :span="3" style="margin-top: 1px">
            <el-dropdown @command="handleCommand">
              <el-button class="type_btn" type="primary" size="small" plain style="width: 120px">Type<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">Movies</el-dropdown-item>
              <el-dropdown-item command="0">Songs</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" style="margin-top: 1px">
            <el-button type="primary" size="small" plain @click="dialogVisible = true" style="width: 120px">
              Add Product
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="invenlist"  height="500" stripe border :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
          <el-table-column label="Product ID" prop="vno"></el-table-column>
          <el-table-column label="Name" prop="vname"></el-table-column>
          <el-table-column label="Actors" prop="actor"></el-table-column>
          <el-table-column label="Type" prop="vtype"></el-table-column>
          <el-table-column label="Price" prop="price"></el-table-column>
          <el-table-column label="Amount" prop="amount"></el-table-column>
          <el-table-column label="Setting">
            <template slot-scope="slope">
              <el-tooltip content="Setting" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="editDialog(slope.row.vno)"></el-button>
              </el-tooltip>
              <el-tooltip content="Delete" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(slope.row.vno)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 用户添加 -->
    <el-dialog
      title="User Information"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <span slot="footer" class="dialog-footer">
        <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px">
          <el-form-item label="Product ID" prop="vno">
            <el-input v-model="ruleForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="vname">
            <el-input v-model="ruleForm.vname"></el-input>
          </el-form-item>
          <el-form-item label="Actors" prop="actor">
            <el-input type="actor" v-model="ruleForm.actor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Type" prop="vtype">
            <el-select v-model="ruleForm.vtype" placeholder="Select" style="margin-left: -185px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input type="price" v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="amount">
            <el-input type="amount" v-model="ruleForm.amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >Confirm</el-button>
            <el-button @click="resetForm('ruleForm')">Cancel</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog
      title="Update VCD"
      :visible.sync="editDialogVisible"
      width="50%">
      <el-form :model="editForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px" label-position="right">
          <el-form-item label="Product ID">
            <el-input v-model="editForm.vno" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="vname">
            <el-input v-model="editForm.vname"></el-input>
          </el-form-item>
          <el-form-item label="Actor" prop="actor">
            <el-input v-model="editForm.actor"></el-input>
          </el-form-item>
          <el-form-item label="Type" prop="vtype">
            <el-input v-model="editForm.vtype"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input v-model="editForm.price"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="amount">
            <el-input v-model="editForm.amount"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateDialog('editForm')">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '电影',
        label: 'Movies'
      }, {
        value: '歌曲',
        label: 'Songs'
      }],
      ruleForm: {
        vno: '',
        vname: '',
        actor: '',
        price: '',
        vtype: '',
        amount: ''
      },
      query: {
        vname: '',
        pagenum: 1,
        pagesize: 2
      },
      // 获取用户信息
      invenlist: [],
      dialogVisible: false,
      editDialogVisible: false,
      editForm: {
      },
      // 校验规则
      loginRules: {
        vno: [
          { required: true, message: 'Product ID can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Product ID should between 5 to 10!', trigger: 'blur' }
        ],
        vname: [
          { required: true, message: 'Name can not be empty', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Price can not be empty', trigger: 'blur' }
        ],
        vtype: [
          { required: true, message: 'Type can not be empty', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: 'Amount can not be empty', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getInvenList()
  },

  methods: {
    async getInvenList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/vcdApi/getInvenList')
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            this.invenlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    selectInvenList () {
      const self = this
      console.log(1)
      self.$http.post('http://127.0.0.1:8001/api/vcdApi/selectInvenList', self.query)
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Acess to inventory failed')
          } else {
            console.log(response.data)
            this.invenlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    submitForm (formName) {
      const self = this
      localStorage.setItem('username', self.ruleForm.username)
      self.$http.post('http://127.0.0.1:8001/api/vcdApi/addInven', self.ruleForm)
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Add failed')
          } else if (response.data === 1) {
            console.log(response)
            this.dialogVisible = false
            return this.$message.success('Add success')
          }
        }).then((error) => {
          console.log(error)
        })
    },
    resetForm (formName) {
      this.ruleForm.vno = ''
      this.ruleForm.vname = ''
      this.ruleForm.actor = ''
      this.ruleForm.vtype = ''
      this.ruleForm.price = ''
      this.ruleForm.amount = ''
      this.dialogVisible = false
    },
    editDialog (id) {
      const self = this
      this.editDialogVisible = true
      console.log(id)
      self.$http.post('http://127.0.0.1:8001/api/vcdApi/editVcdList', { vno: id })
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Edit failed')
          } else {
            console.log(response)
            this.editForm = response.data[0]
          }
        }).then((error) => {
          console.log(error)
        })
    },
    updateDialog (editForm) {
      const self = this
      this.editDialogVisible = true
      self.$http.post('http://127.0.0.1:8001/api/vcdApi/updateDialog', self.editForm)
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Edit failed')
          } else {
            this.editDialogVisible = false
            return this.$message({ message: 'Edit success', type: 'success' })
          }
        }).then((error) => {
          console.log(error)
        })
    },
    deleteDialog (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const self = this
        console.log(id)
        self.$http.post('http://127.0.0.1:8001/api/vcdApi/deleteVCD', { vno: id })
          .then((response) => {
            console.log(1)
            if (response.data === -1) {
              return this.$message.error('Delete failed')
            } else {
              this.$message({ type: 'success', message: 'Delete success!' })
            }
          }).then((error) => {
            console.log(error)
          })
      }).catch(() => {
        this.$message({ type: 'info', message: 'Delete cancelled' })
      })
    },
    handleCommand (command) {
      const self = this
      self.$http.post('http://127.0.0.1:8001/api/vcdApi/typeInvenList', { type: command })
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Acess to inventory failed')
          } else {
            console.log(response.data)
            this.invenlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  position: relative;
  left: 35%;
}

.el-form-item {
  font-family: 'Gill Sans';
  width: 70%;
  position: relative;
  left: 10%;
  box-sizing: border-box;
}

.card {
  height: 1000px;
}
</style>
