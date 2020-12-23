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
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <el-col :span="2">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#1A1A1A"
            active-text-color="#cc6774"
            router
            unique-opened
            >
            <!-- 用户管理 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span><font face="Tahoma"><b>User</b></font></span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <font face="Tahoma"><b>Account Management</b></font>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 商品管理 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span><font face="Tahoma"><b>Inventory</b></font></span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1"><font face="Tahoma"><b>Inventory Management</b></font></el-menu-item>
                <el-menu-item index="2-2"><font face="Tahoma"><b>Stock Management</b></font></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 订单管理 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span><font face="Tahoma"><b>Orders</b></font></span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <font face="Tahoma"><b>Lending Order</b></font>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <font face="Tahoma"><b>Selling Order</b></font>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-button class="exit_button" plain icon="el-icon-back" @click="logout" size="big">
        <font face="Tahoma"><b>Exit</b></font>
      </el-button>
      <!-- 右侧区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push('/login')
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
