<template>
<div class="login_container">
  <img class="wallpaper" src="../assets/login_bg.jpg">
  <div class="sustech_title">
    <img class="hat" src="../assets/hat.png">
    <p><b>
        <font color="whitesmoke">SUSTech.<br>VCD</font>Store
      </b></p>
  </div>
  <div class="login_box">
    <img class="santas" src="../assets/santas.gif">
    <p class="login_title">
      <b>
        <font color="black">DBM</font>S
      </b>
    </p>
    <!-- 登录表单区 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="Username" prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="Password" prefix-icon="el-icon-lock" show-password @keyup.enter.native="submitForm('loginForm')"></el-input>
      </el-form-item>
    </el-form>
    <!-- 登陆注册button -->
    <div class="user_btns">
      <div>
        <button class="btn_login" @click="submitForm('loginForm')"><b>Login</b></button>
      </div>
      <div>
        <button class="btn_signup" @click="dialogVisible = true"><b>Sign up</b></button>
      </div>
    </div>
  </div>
  <!-- 用户注册 -->
  <el-dialog title="User Information" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" center>
    <span slot="footer" class="dialog-footer">
      <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px">
        <el-form-item label="Account" prop="cno">
          <el-input v-model="registerForm.cno"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="cname">
          <el-input v-model="registerForm.cname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="cpassword">
          <el-input type="password" v-model="registerForm.cpassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="Tel" prop="ctel">
          <el-input type="tel" v-model="registerForm.ctel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signup('rigisterForm')">Confirm</el-button>
          <el-button @click="resetForm('ruleForm')">Cancel</el-button>
        </el-form-item>
      </el-form>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      // 登陆表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        cno: '',
        cname: '',
        cpassword: '',
        ctel: '',
        cadmin: '0'
      },
      // 校验规则
      loginRules: {
        cno: [
          { min: 5, max: 10, message: 'Length of username should between 5 to 10!', trigger: 'blur' }
        ],
        ctel: [
          { min: 11, max: 11, message: 'Invalid tel number!', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      editDialogVisible: false
    }
  },
  methods: {
    submitForm (formName) {
      const self = this
      localStorage.setItem('username', self.loginForm.username)
      localStorage.setItem('user', JSON.stringify(self.loginForm))
      console.log(JSON.stringify(self.loginForm))
      self.$http.post('http://127.0.0.1:8001/api/userApi/login', self.loginForm)
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Login failed')
          } else if (response.data === 0) {
            return this.$message.error('Login failed')
          } else if (response.data === 2) {
            this.$router.push('/home')
            console.log(response)
            return this.$message.success('Login success')
          } else if (response.data === 1) {
            this.$router.push('/homeno')
            console.log(response)
            return this.$message.success('Login success')
          }
        }).then((error) => {
          console.log(error)
        })
    },
    signup (formName) {
      const self = this
      self.$http.post('http://127.0.0.1:8001/api/userApi/addUser', self.registerForm)
        .then((response) => {
          console.log(response)
          if (response.data === -1) {
            return this.$message.error('Sign up failed')
          } else if (response.data === 1) {
            console.log(response)
            this.dialogVisible = false
            return this.$message.success('Sign up success')
          }
        }).then((error) => {
          console.log(error)
        })
    },
    resetForm (formName) {
      this.registerForm.cno = ''
      this.registerForm.cname = ''
      this.registerForm.ctel = ''
      this.registerForm.cpassword = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;

  .wallpaper {
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .sustech_title {
    font-family: Tahoma;
    font-size: 80px;
    width: 450px;
    height: 300px;
    text-indent: -75px;
    text-shadow: 0 0 2px rgb(0, 0, 0);
    position: absolute;
    left: 15%;
    top: 20%;
    color: black;

    .hat {
      width: 40%;
      height: 50%;
      position: absolute;
      left: -38%;
      top: 11%;
      z-index: 1;
    }
  }
}

.login_box {
  width: 400px;
  height: 450px;
  background-color: whitesmoke;
  border-radius: 5px;
  position: absolute;
  left: 58%;
  top: 48%;
  transform: translate(0, -50%);
  box-shadow: 0 0 8px rgb(7, 7, 7);

  .santas {
    width: 50%;
    height: 40%;
    position: absolute;
    right: 26%;
    top: -18%;
    z-index: 1;
  }
}

.login_title {
  width: 100%;
  padding: 0 25%;
  color: rgb(230, 113, 104);
  font-size: 60px;
  letter-spacing: 3px;
  font-family: 'Gill Sans';
}

.login_form {
  position: absolute;
  bottom: 40%;
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
}

.user_btns {
  position: relative;
  width: 100%;
  top: 100px;
  padding: 0 10%;
  box-sizing: border-box;

  .btn_login {
    font-size: 16px;
    font-family: 'Gill Sans';
    color: white;
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border-block-width: 2px;
    border-color: white;
    background-color: black;
  }

  .btn_signup {
    font-size: 16px;
    font-family: 'Gill Sans';
    color: white;
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border-block-width: 2px;
    border-color: white;
    background-color: black;
    position: relative;
    top: 5px;

  }
}
</style>
