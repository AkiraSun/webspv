<template>
    <div class="main">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
  name: 'main',
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>