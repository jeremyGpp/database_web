<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>User</el-breadcrumb-item>
      <el-breadcrumb-item>Account Management</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="8">
            <el-input placeholder="Search" v-model="query.cno_search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectUserList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" style="margin-top: 1px">
            <el-button type="primary" plain @click="dialogVisible = true" style="width: 120px">
              Add User
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="userlist"  height="500" stripe border :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
          <el-table-column label="No. " type="index" width="75px"></el-table-column>
          <el-table-column label="Account" prop="cno"></el-table-column>
          <el-table-column label="Username" prop="cname"></el-table-column>
          <el-table-column label="Telephone" prop="ctel"></el-table-column>
          <el-table-column label="Authority" prop="cadmin">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.cadmin"
                active-value='1'
                inactive-value='0'
                @change="userAdmin(scope.row)"
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="Setting">
            <template slot-scope="slope">
              <el-tooltip content="Setting" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="editDialog(slope.row.cno)"></el-button>
              </el-tooltip>
              <el-tooltip content="Delete" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(slope.row.cno)"></el-button>
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
          <el-form-item label="Account" prop="cno">
            <el-input v-model="ruleForm.cno"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="cname">
            <el-input v-model="ruleForm.cname"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="cpassword">
            <el-input type="password" v-model="ruleForm.cpassword" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item label="Tel" prop="ctel">
            <el-input type="tel" v-model="ruleForm.ctel" autocomplete="off"></el-input>
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
      title="Update User"
      :visible.sync="editDialogVisible"
      width="50%">
      <el-form :model="editForm" status-icon :rules="loginRules" ref="ruleForm" label-width="70px">
          <el-form-item label="Account">
            <el-input v-model="editForm.cno" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="cname">
            <el-input v-model="editForm.cname"></el-input>
          </el-form-item>
          <el-form-item label="Tel" prop="ctel">
            <el-input type="tel" v-model="editForm.ctel" autocomplete="off"></el-input>
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
      ruleForm: {
        cno: '',
        cpassword: '',
        cname: '',
        ctel: '',
        cadmin: 0
      },
      query: {
        cno_search: '',
        pagenum: 1,
        pagesize: 2
      },
      // 获取用户信息
      userlist: [],
      dialogVisible: false,
      editDialogVisible: false,
      editForm: {
      },
      // 校验规则
      loginRules: {
        cno: [
          { required: true, message: 'Account can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of username should between 5 to 10!', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: 'Name can not be empty', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: 'Password can not be empty', trigger: 'blur' }
        ],
        ctel: [
          { required: true, message: 'Telephone can not be empty', trigger: 'blur' },
          { min: 11, max: 11, message: 'Invalid tel number!', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getUserList()
  },

  methods: {
    async getUserList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/userApi/getUserList')
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            console.log(response.data)
            this.userlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    selectUserList () {
      const self = this
      console.log(self.query)
      self.$http.post('http://127.0.0.1:8001/api/userApi/selectUserList', self.query)
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            console.log(response.data)
            this.userlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    userAdmin (userinfo) {
      const self = this
      console.log(userinfo)
      self.$http.post('http://127.0.0.1:8001/api/userApi/updateUser', userinfo)
        .then((response) => {
          console.log(response)
        }).then((error) => {
          console.log(error)
        })
    },
    submitForm (formName) {
      const self = this
      self.$http.post('http://127.0.0.1:8001/api/userApi/addUser', self.ruleForm)
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
      this.ruleForm.cno = ''
      this.ruleForm.password = ''
      this.dialogVisible = false
    },
    editDialog (id) {
      const self = this
      this.editDialogVisible = true
      console.log(id)
      self.$http.post('http://127.0.0.1:8001/api/userApi/editUserList', { cno: id })
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
      self.$http.post('http://127.0.0.1:8001/api/userApi/updateDialog', self.editForm)
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
      this.$confirm('Are you sure about it?', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const self = this
        console.log(id)
        self.$http.post('http://127.0.0.1:8001/api/userApi/deleteUser', { cno: id })
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
