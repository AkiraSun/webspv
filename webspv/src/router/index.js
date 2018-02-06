import Vue from 'vue'
import Router from 'vue-router'
// import store from '../vuex'
/* layout */
import Layout from '../components/page/Layout'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '首页',
    component: Layout,
    redirect: '/home',
    children: [{ path: 'home', component: resolve => require(['../components/page/Home'], resolve) }]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/page/Login'], resolve)
  },
  {
    path: '/app',
    component: Layout,
    name: 'app',
    redirect: '/app/index',
    children: [{ path: 'index', component: resolve => require(['../components/page/Layout/app'], resolve), name: 'index' }]
  }
]
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  // 若userkey不存在并且前往页面不是登陆页面，进入登陆
  // 若userkey存在并且前往登陆页面，进入主页
  console.log('to', to)
  const userKey = localStorage.getItem('userKey')
  if (!userKey && to.path !== '/login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (userKey && to.path === '/login') {
    next({ path: '/' })
  } else {
    next()
  }
})
export default router

