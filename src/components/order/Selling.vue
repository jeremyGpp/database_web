<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Orders</el-breadcrumb-item>
      <el-breadcrumb-item>Selling Orders</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="8">
            <el-input placeholder="Search" v-model="query.input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectSellList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" style="margin-top: 1px">
            <el-button type="primary" size="small" plain @click="dialogVisible = true" style="width: 120px">
              New Order
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="selllist"  height="500" stripe border :header-cell-style="{textAlign: 'center'}" :row-style="{ height: '30px' }" :cell-style="{ textAlign: 'center',padding: '10px 0'}">
          <el-table-column label="Order No." prop="bno"></el-table-column>
          <el-table-column label="Product ID" prop="vno"></el-table-column>
          <el-table-column label="Account" prop="cno"></el-table-column>
          <el-table-column label="Amount" prop="samount"></el-table-column>
          <el-table-column label="Price" prop="sprice"></el-table-column>
          <el-table-column label="Deal Date" prop="stime"></el-table-column>
          <el-table-column label="Setting">
            <template slot-scope="slope">
              <el-tooltip content="Delete" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteDialog(slope.row.bno)"></el-button>
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
          <el-form-item label="Order No." prop="bno">
            <el-input v-model="ruleForm.bno"></el-input>
          </el-form-item>
          <el-form-item label="Account No." prop="cno">
            <el-input v-model="ruleForm.cno"></el-input>
          </el-form-item>
          <el-form-item label="Product ID" prop="vno">
            <el-input v-model="ruleForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="samount">
            <el-input v-model="ruleForm.samount"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="samount">
            <el-button type="primary" plain @click="selectSellPrice('ruleForm')">Compute Price</el-button>
          </el-form-item>
          <el-form-item label="Price" prop="sprice">
            <el-input v-model="ruleForm.sprice" disabled></el-input>
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
        bno: '',
        vno: '',
        cno: '',
        samount: '',
        sprice: '',
        stime: new Date().toLocaleDateString()
      },
      price: 0,
      amount: 0,

      query: {
        input: ''
      },
      // 获取用户信息
      selllist: [],
      dialogVisible: false,
      editDialogVisible: false,
      loginRules: {
        bno: [
          { required: true, message: 'Order No. can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Product ID should between 5 to 10!', trigger: 'blur' }
        ],
        vno: [
          { required: true, message: 'Product ID can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Product ID should between 5 to 10!', trigger: 'blur' }
        ],
        cno: [
          { required: true, message: 'Account can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Account should between 5 to 10!', trigger: 'blur' }
        ],
        samount: [
          { required: true, message: 'Amount can not be empty', trigger: 'blur' }
        ],
        sprice: [
          { required: true, message: 'Price can not be empty', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getSellList()
  },

  methods: {
    async getSellList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/sellApi/getSellList')
        .then((response) => {
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].stime = new Date(response.data[i].stime).toLocaleDateString()
          }
          this.selllist = response.data
        }).then((error) => {
          console.log(error)
        })
    },
    selectSellList () {
      const self = this
      console.log(1)
      self.$http.post('http://127.0.0.1:8001/api/sellApi/selectSellList', self.query)
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
    selectSellPrice (formName) {
      const self = this
      console.log(1)
      self.$http.post('http://127.0.0.1:8001/api/sellApi/selectSellPrice', self.ruleForm)
        .then((response) => {
          this.price = response.data[0].price
          this.amount = parseFloat(self.ruleForm.samount)
          this.ruleForm.sprice = this.price * this.amount
          console.log(this.ruleForm.sprice)
        }).then((error) => {
          console.log(error)
        })
    },
    submitForm (formName) {
      const self = this
      console.log(self.ruleForm)
      self.ruleForm.stime = new Date(self.ruleForm.stime).toLocaleDateString()
      self.$http.post('http://127.0.0.1:8001/api/sellApi/addSell', self.ruleForm)
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
      this.ruleForm.bno = ''
      this.ruleForm.cno = ''
      this.ruleForm.lprice = ''
      this.ruleForm.lamount = ''
      this.ruleForm.rtime = ''
      this.dialogVisible = false
    },
    deleteDialog (id) {
      this.$confirm('Are you sure about it?', 'Notification', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const self = this
        console.log(id)
        self.$http.post('http://127.0.0.1:8001/api/sellApi/deleteSell', { bno: id })
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
