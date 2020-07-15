<template>
  <div class="loginBox container">
    <div class="row">
      <div class="loginmsg loginmsg col-md-6 hidden-xs">
        123
      </div>
      <div class="loginmsg loginform col-md-6">
        <el-card>
          <div class="loginTitle hidden-xs">
            密码登录
          </div>
          <el-form
            :model="loginForm"
            status-icon
            :rules="loginrules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                class="subButton"
                type="primary"
                @click="submitForm('ruleForm')"
                >提交</el-button
              >
            </el-form-item>
            <el-form-item label="免费注册" label-width="100%"></el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {}
  }
};
</script>
<style lang="scss">
.loginBox {
  // width: 100%;
  // background: blue;
  .loginmsg {
    border: 1px solid red;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    .el-card {
      width: 100%;
      .loginTitle {
        color: #000000;
        font-size: 22px;
        height: 50px;
      }
      .el-form {
        .el-form-item {
          .subButton {
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and(max-width: 768px) {
  .loginmsg {
    align-items: flex-start !important;
    .el-card {
      margin-top: 50px;
    }
  }
}
</style>
