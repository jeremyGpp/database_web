<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Inventory</el-breadcrumb-item>
      <el-breadcrumb-item>Stock Management</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="8">
            <el-input placeholder="Search" v-model="query.input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectStockList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" style="margin-top: 1px">
            <el-button type="primary" size="small" plain @click="dialogVisible = true" style="width: 120px">
              New Order
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="stocklist"  height="500" stripe border :header-cell-style="{textAlign: 'center'}" :row-style="{ height: '30px' }" :cell-style="{ textAlign: 'center',padding: '10px 0'}">
          <el-table-column label="Product ID" prop="vno"></el-table-column>
          <el-table-column label="Amount" prop="inamount"></el-table-column>
          <el-table-column label="Price" prop="inprice"></el-table-column>
          <el-table-column label="inDate" prop="intime"></el-table-column>
          <el-table-column label="Setting">
            <template slot-scope="slope">
              <el-tooltip content="Delete" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(slope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 用户添加 -->
    <el-dialog
      title="New Order"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <span slot="footer" class="dialog-footer">
        <el-form :model="ruleForm" status-icon :rules="loginRules" label-position="left" ref="ruleForm" label-width="100px">
          <el-form-item label="Product ID" prop="vno">
            <el-input v-model="ruleForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="inamount">
            <el-input v-model="ruleForm.inamount"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="inprice">
            <el-input v-model="ruleForm.inprice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >Confirm</el-button>
            <el-button @click="resetForm('ruleForm')">Cancel</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        vno: '',
        inamount: '',
        insprice: '',
        intime: new Date()
      },
      query: {
        input: ''
      },
      // 获取用户信息
      stocklist: [],
      dialogVisible: false,
      editDialogVisible: false,
      loginRules: {
        vno: [
          { required: true, message: 'Product ID can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Product ID should between 5 to 10!', trigger: 'blur' }
        ],
        inamount: [
          { required: true, message: 'Amount can not be empty', trigger: 'blur' }
        ],
        inprice: [
          { required: true, message: 'Price can not be empty', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getStockList()
  },

  methods: {
    async getStockList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/stockApi/getStockList')
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            for (let i = 0; i < response.data.length; i++) {
              response.data[i].intime = new Date(response.data[i].intime).toLocaleDateString()
            }
            this.stocklist = response.data
            console.log(this.selllist)
          }
        }).then((error) => {
          console.log(error)
        })
    },
    selectStockList () {
      const self = this
      console.log(1)
      self.$http.post('http://127.0.0.1:8001/api/stockApi/selectStockList', self.query)
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Acess failed')
          } else {
            console.log(response.data)
            this.selllist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    submitForm (formName) {
      const self = this
      console.log(self.ruleForm)
      self.ruleForm.intime = new Date(self.ruleForm.intime).toLocaleDateString()
      self.$http.post('http://127.0.0.1:8001/api/stockApi/addStock', self.ruleForm)
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
      this.ruleForm.inprice = ''
      this.ruleForm.inamount = ''
      this.ruleForm.intime = ''
      this.dialogVisible = false
    },
    deleteDialog (row) {
      this.$confirm('Are you sure about it?', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const self = this
        console.log(row)
        self.$http.post('http://127.0.0.1:8001/api/stockApi/deleteStock', row)
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
.el-table {
  font-size: 15px;
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
