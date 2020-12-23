<template>
<el-container class="home_container">
  <!-- 头部区域 -->
  <el-header height="100px">
    <div class="home_title">
      <b><i>
          <font face='Gill Sans' color="whitesmoke">VCDStore</font>
          <font face='Gill Sans' color="black"> DBMS</font>
        </i></b>
    </div>
    <div class="sustech_logo">
      <img src="../assets/logo_sustech.png" />
    </div>
  </el-header>
  <!-- 主区域 -->
  <el-main>
    <el-card>
      <div style="margin-top: 15px;">
        <el-row gutter="40">
          <el-col :span="10" style="margin-left: 400px;">
            <el-input placeholder="Search" v-model="query.vname" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="selectInvenList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4" style="margin-left: 60px; margin-top:1px;">
            <el-dropdown @command="handleCommand">
              <el-button class="type_btn" type="primary" size="small" plain style="width: 120px;">Type<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">Movies</el-dropdown-item>
                <el-dropdown-item command="0">Songs</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col>
            <el-button class="exit_button" icon="el-icon-back" @click="logout" size="big">
              <font face="Tahoma"><b>Exit</b></font>
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="invenlist" height="600" stripe border :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
          <el-table-column label="Product ID" prop="vno"></el-table-column>
          <el-table-column label="Name" prop="vname"></el-table-column>
          <el-table-column label="Actors" prop="actor"></el-table-column>
          <el-table-column label="Type" prop="vtype"></el-table-column>
          <el-table-column label="Price" prop="price"></el-table-column>
          <el-table-column label="Amount" prop="amount"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-main>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        vno: '',
        vname: '',
        actor: '',
        price: '',
        vtype: '',
        amount: ''
      },
      query: {
        vname: ''
      },
      // 获取用户信息
      invenlist: [],
      dialogVisible: false,
      editDialogVisible: false,
      editForm: {}
    }
  },

  created () {
    this.getInvenList()
  },

  methods: {
    logout () {
      this.$router.push('/login')
    },

    async getInvenList () {
      const self = this
      self.$http.get('http://127.0.0.1:8001/api/vcdApi/getInvenList')
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Access failed')
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
            return this.$message.error('Access to inventory failed')
          } else {
            console.log(response.data)
            this.invenlist = response.data
          }
        }).then((error) => {
          console.log(error)
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
.home_container {
  height: 100%;

  .exit_button {
    width: 200px;
    position: absolute;
    left: 2%;
    bottom: 4%;
    z-index: 1;
  }
}

.el-header {
  background-color: #ae5763;
  display: flex;
  justify-content: space-between;

  .home_title {
    font-size: 55px;
    position: relative;
    top: 15px;
    left: -5px;
    text-shadow: -1px 0 1px rgb(24, 23, 23);
  }

  .sustech_logo {
    position: relative;
    top: 15%;
  }
}

.el-main {
  background-color: #fff;
}
</style>
