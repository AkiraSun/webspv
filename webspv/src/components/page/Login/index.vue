<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                  <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
        
    </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (this.$data.userNull === true) {
        callback(new Error('用户名不存在'))
      } else {
        callback()
      }
    }
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.$data.pwdError === true) {
        callback(new Error('密码错误!'))
      } else {
        callback()
      }
    }
    return {
      userNull: false,
      pwdError: false,
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { validator: checkUser, required: true, trigger: 'blur' }
        ],
        password: [
          { validator: checkPwd, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginDispatch(formName) {
      var self = this
      self.userNull = false
      self.pwdError = false
      self.$refs.ruleForm.validateField('username')
      const userInfo = {
        username: self.ruleForm.username,
        password: self.ruleForm.password
      }
      self.$store.dispatch('LoginByUsername', userInfo).then((res) => {
        console.log('login', res)
        if (res.success === true) {
          localStorage.setItem('userKey', res.obj.userkey)
          localStorage.setItem('lastLoginTime', res.obj.lastLoginTime)
          localStorage.setItem('userName', res.obj.account)
          self.$message({
            message: '登陆成功',
            type: 'success',
            duration: 2 * 1000
          })
          var redirect = decodeURIComponent(this.$route.query.redirect || '/')
          self.$router.push({
            //  你需要接受路由的参数再跳转
            path: redirect
          })
        } else {
          console.log('cuo')
          if (res.msg === '未找到用户') {
            console.log('未找到用户')
            self.userNull = true
            self.$refs[formName].validate()
          } else if (res.msg === '密码错误') {
            self.pwdError = true
            self.$refs[formName].validate()
          }
        }
      }).catch(() => {
        this.$message({
          message: '登陆失败',
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        console.log('valid', valid)
        if (valid) {
          self.loginDispatch(formName)
        } else {
          self.loginDispatch(formName)
          console.log('error submit!!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url('../../../assets/BG.png') no-repeat center;
        background-size: cover;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        background-color:rgba(250,250,250,0.4);// -->70%的不透明度  
        border-radius: 4px;
    }
</style>