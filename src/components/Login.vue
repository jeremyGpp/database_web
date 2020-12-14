<template>
    <div class="login_container">
        <img class="wallpaper" src="../assets/drhDe29TEts.jpg">
        <p class="sustech_title">
            <b><i><font color="black">SUSTech.<br>VCD</font>Store</i></b>
        </p>
        <div v-show="true" class="login_box">
            <p class="login_title">
                    <b><font color="white">DBM</font>S</b>
            </p>
            <!-- 登录表单区 -->
            <el-form class="login_form" label-width="0px">
                <!-- 用户名 -->
                <el-form-item class="item_user" >
                    <el-input ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item class="item_pw">
                    <el-input ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="item_btns">
                    <button class="btn_login"><b>Login</b></button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.login_container {
    height: 100%;

    .wallpaper {
        width: 100%;
        height:100%;
    }
}

.login_box {
    width: 400px;
    height: 500px;
    background-color: black;
    border-radius: 5px;
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translate(0, -50%);
    box-shadow: 0 0 8px rgb(7, 7, 7)
}

.login_title {
    position: absolute;
    top: 8%;
    width: 100%;
    padding: 0 25%;
    color:rgb(237, 108, 0);
    font-size: 60px;
    letter-spacing: 3px;
    font-family:'Gill Sans';
}

.sustech_title {
    font-family:Tahoma;
    font-size: 80px;
    width: 450px;
    height: 300px;
    position: absolute;
    left: 12%;
    top: 25%;
    color: rgb(237, 108, 0);
}

.login_form {
    position: absolute;
    bottom: 30%;
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
}

.btn_login {
    font-size: 16px;
    font-family: Tahoma;
    height: 35px;
    width: 100%;
    padding: 0 20%;
    box-sizing: border-box;
    border-radius: 7px;
    border-color: rgb(65, 62, 62);
    background-color: white;
    position: absolute;
    top: 5px;
}
</style>
