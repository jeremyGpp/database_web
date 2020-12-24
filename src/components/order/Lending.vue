<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Orders</el-breadcrumb-item>
      <el-breadcrumb-item>Lending Orders</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="8">
            <el-input placeholder="Search" v-model="query.input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectLendList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" style="margin-top: 1px">
            <el-button type="primary" size="small" plain @click="dialogVisible = true" style="width: 120px">
              New Order
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="lendlist"  height="500" stripe border :header-cell-style="{textAlign: 'center'}" :row-style="{ height: '30px' }" :cell-style="{ textAlign: 'center',padding: '10px 0'}">
          <el-table-column label=" Order No." prop="bno"></el-table-column>
          <el-table-column label="Account" prop="cno"></el-table-column>
          <el-table-column label="Product ID" prop="vno"></el-table-column>
          <el-table-column label="Amount" prop="lamount"></el-table-column>
          <el-table-column label="Price" prop="lprice"></el-table-column>
          <el-table-column label="Start Date" prop="ltime"></el-table-column>
          <el-table-column label="Due Date" prop="rtime"></el-table-column>
          <el-table-column label="Overdue" prop="ostate">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.ostate"
                active-color="#DC143C"
                active-value='1'
                inactive-value='0'
                disabled
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="State" prop="vstate" width="150px">
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.vstate"
                active-value="借出"
                inactive-value="入库"
                active-text="借"
                inactive-text="还"
                @change="updateLend(scope.row)">
              </el-switch>
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
        <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px">
          <el-form-item label="Order No." prop="bno">
            <el-input v-model="ruleForm.bno"></el-input>
          </el-form-item>
          <el-form-item label="Account No." prop="cno">
            <el-input v-model="ruleForm.cno"></el-input>
          </el-form-item>
          <el-form-item label="Product ID" prop="vno">
            <el-input v-model="ruleForm.vno"></el-input>
          </el-form-item>
          <el-form-item label="Amount" prop="lamount">
            <el-input v-model="ruleForm.lamount"></el-input>
          </el-form-item>
          <el-form-item label="Due Date" required>
            <el-date-picker type="date" placeholder="Select date" v-model="ruleForm.rtime" style="width: 100%;" ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getLendPrice('ruleForm')">Compute Price</el-button>
          </el-form-item>
          <el-form-item label="Price" prop="lprice">
            <el-input v-model="ruleForm.lprice" disabled></el-input>
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
        lamount: '',
        lprice: '',
        ltime: new Date().toLocaleDateString(),
        rtime: '',
        vstate: '借出',
        ostate: '0'
      },
      price: 0,
      days: 0,
      query: {
        input: ''
      },
      // 获取用户信息
      lendlist: [],
      overdue: [],
      dialogVisible: false,
      editDialogVisible: false,
      loginRules: {
        bno: [
          { required: true, message: 'Order No. can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Order No. should between 5 to 10!', trigger: 'blur' }
        ],
        vno: [
          { required: true, message: 'Product ID can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Product ID should between 5 to 10!', trigger: 'blur' }
        ],
        cno: [
          { required: true, message: 'Account can not be empty', trigger: 'blur' },
          { min: 5, max: 10, message: 'Length of Account should between 5 to 10!', trigger: 'blur' }
        ],
        lamount: [
          { required: true, message: 'Amount can not be empty', trigger: 'blur' }
        ],
        lprice: [
          { required: true, message: 'Price can not be empty', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getLendList()
  },

  methods: {
    async getLendList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/lendApi/getLendList', self.ruleForm)
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            var d = new Date()
            for (let i = 0; i < response.data.length; i++) {
              response.data[i].ltime = new Date(response.data[i].ltime).toLocaleDateString()
              response.data[i].rtime = new Date(response.data[i].rtime).toLocaleDateString()
              if (d.getTime() > new Date(response.data[i].rtime).getTime() && response.data[i].vstate === '借出') {
                response.data[i].ostate = '1'
              } else {
                response.data[i].ostate = '0'
              }
            }
            this.lendlist = response.data
            console.log(this.lendlist)
          }
        }).then((error) => {
          console.log(error)
        })
    },
    getLendPrice (formName) {
      const self = this
      self.$http.post('http://127.0.0.1:8001/api/lendApi/getLendPrice', self.ruleForm)
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Acess to users failed')
          } else {
            console.log(response.data[0].price)
            var d1 = new Date(this.ruleForm.ltime)
            var d2 = new Date(this.ruleForm.rtime)
            this.price = response.data[0].price / 5
            this.days = parseInt((d2 - d1) / 1000 / 3600 / 24)
            console.log(this.days)
            this.ruleForm.lprice = this.days * this.price * this.ruleForm.lamount
          }
        }).then((error) => {
          console.log(error)
        })
    },
    updateLend (orderinfo) {
      const self = this
      console.log(orderinfo)
      self.$http.post('http://127.0.0.1:8001/api/lendApi/updateLend', orderinfo)
        .then((response) => {
          console.log(response)
        }).then((error) => {
          console.log(error)
        })
    },
    selectLendList () {
      const self = this
      console.log(1)
      self.$http.post('http://127.0.0.1:8001/api/lendApi/selectLendList', self.query)
        .then((response) => {
          console.log(1)
          if (response.data === -1) {
            return this.$message.error('Acess failed')
          } else {
            console.log(response.data)
            this.lendlist = response.data
          }
        }).then((error) => {
          console.log(error)
        })
    },
    submitForm (formName) {
      const self = this
      console.log(self.ruleForm)
      self.ruleForm.rtime = new Date(self.ruleForm.rtime).toLocaleDateString()
      self.$http.post('http://127.0.0.1:8001/api/lendApi/addLend', self.ruleForm)
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
