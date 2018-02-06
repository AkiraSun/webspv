<template>
  <div class="el-menu-wrapper">
    
    <!-- <el-menu :router='true' class="el-menu-container" :default-active="$route.path" @open="handleOpen" @close="handleClose"  theme="dark">
      <el-submenu index="">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
              <el-menu-item index="app/index">app</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组二">
              <el-menu-item index="/">home</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
    <el-menu :router='true'   unique-opened :default-active="$route.path" class="el-menu-container" @open="handleOpen" @close="handleClose"  theme="dark" >
        <div class="logo"></div>
        <el-submenu index="/">
          <template slot="title">首页</template>
          <el-menu-item index="/home">home</el-menu-item>
        </el-submenu>
        <el-submenu index="/app">
          <template slot="title">爱屁屁</template>
          <el-menu-item index="/app/index">app</el-menu-item>
        </el-submenu>
        <div class="logo"></div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {
    console.log('"$route.path', this.$route.path)
  }
}
</script>
<style lang="css" scoped>
.el-menu-wrapper {
  position: absolute;
  width: 192px;
  left: 0;
  top: 0;
  bottom: 0;
  min-height: 100%;
  height: 100%;
}
.logo {
  height: 200px;
  width: 100%;
}
.el-menu-container {
  height: 100%;
}
</style>