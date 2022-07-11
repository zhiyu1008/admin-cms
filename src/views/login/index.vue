<template>
  <div class="container">
    <h1>智慧服务平台</h1>
    <div class="box">
      <h2>欢迎登录</h2>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleform"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="ccode">
          <el-input
            class="codeInput"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          ></el-input>
          <img
            class="captchaImg"
            @click="handleGetNewCode"
            :src="captchaImg"
            alt=""
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="handleLoginSubmit"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import User from '../../api/user'
export default {
  components: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      captchaImg: '',
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.handleGetCode()
  },
  mounted() {},
  methods: {
    // 获取验证码事件
    async handleGetCode() {
      const { token, captchaImg } = await User.getCode()
      this.captchaImg = captchaImg
      this.loginForm.token = token
    },
    // 获取新验证码
    handleGetNewCode() {
      this.loginForm.code = ''
      this.handleGetCode()
    },
    // 表单校验事件
    handleLoginValidate() {
      this.$refs.ruleform.validate((valid) => {
        if (valid) {
          this.handleLoginSubmit()
        }
      })
    },
    // 登录事件
    async handleLoginSubmit() {
      try {
        const token = await this.$store.dispatch('user/login', this.loginForm)
        if (!token) return
        // this.$notify({ title: '提示', message: '登录成功', type: 'success' })
        // this.loadingStatus = true
        this.$store.dispatch('user/getUserInfo')
        this.$store.dispatch('user/getNav')
        await this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Verdana;
  background: url('http://zh.9yuecloud.com/img/bg.970bc3a9.jpg') no-repeat fixed
    center;
  background-size: cover;
  h1 {
    position: absolute;
    bottom: 650px;
    left: 40%;
    text-align: center;
    color: #fff;
    font-size: 42px;
    font-weight: 400;
    letter-spacing: 5px;
  }
  .box {
    width: 310px;
    height: 355px;
    position: absolute;
    left: 40%;
    bottom: 150px;
    color: #fff;
    h2 {
      font-size: 30px;
    }
    .demo-ruleForm {
      margin-top: 30px;
      .el-form-item {
        margin-bottom: 40px;
        .el-button {
          width: 310px;
        }
      }
      .ccode {
        display: flex;
        .codeInput {
          width: 170px;
          margin-right: 10px;
        }
        .captchaImg {
          width: 125px;
          height: 40px;
          border-radius: 5px;
          position: relative;
          top: 15px;
        }
      }
    }
  }
}
</style>
