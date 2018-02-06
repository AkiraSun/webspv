<template>
    <div class="app-wrapper">
      <Sidebar></Sidebar>
      <div class="main-container">
        <NavBar></NavBar>
        <LayoutMain></LayoutMain>
      </div>
    </div>
</template>
<script>
import Sidebar from './sidebar'
import LayoutMain from './layoutMain'
import NavBar from './navbar'
export default {
  name: 'layout',
  components: {
    Sidebar,
    NavBar,
    LayoutMain
  },
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
    const data = {
      userkey: localStorage.getItem('userKey')
    }
    this.$store.dispatch('GetCurrentUser', data).then((data) => {
    }).catch(() => {
    })
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-container {
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  left: 192px;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 10px 10px 10px;
}
</style>