<template>
    <div class="ap">
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <div>123</div></br>
        <el-button type="primary" @click="loginOut()">注销</el-button>
        <el-button @click="newblank()">新页面</el-button>
    </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
    newblank() {
      window.open('http://192.168.101.112:8080', '_blank')
    },
    loginOut() {
      var self = this
      this.$confirm('您确定要退出AMC不良资产管理平台吗?', '退出管理平台', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        const outInfo = {
          'account': localStorage.getItem('userName'),
          'userkey': localStorage.getItem('userKey')
        }
        self.$store.dispatch('LogOut', outInfo).then(() => {
          self.$router.push({ path: '/login' })
        }).catch(() => {
        })
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="css" scoped>
.ap div {
    background-color: red;
    width: 100px;
    height: 100px;
}
</style>