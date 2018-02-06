import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '../router'
import store from '../vuex'
const fetch = axios.create({
  timeout: 10000,
  baseURL: 'http://116.62.138.41:8082/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function(data) {
    //  在这里根据自己的需求改变数据
    let ret = ''
    for (var it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})
// respone拦截器
fetch.interceptors.response.use(
  response => {
    const data = response.data
    if (localStorage.getItem('userKey') && !store.getters.userkey) {
      console.log('hepppp')
      store.state.user.userkey = localStorage.getItem('userKey')
    }
    if (data.statusCode === 301) {
      MessageBox.alert('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        localStorage.clear()
        router.replace({
          path: '/login'
        })
        return
      }).catch(() => {
        localStorage.clear()
        router.replace({
          path: '/login'
        })
      })
    } else {
      return response
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = (process.env.NODE_ENV === 'production' ? `请求地址出错` : `请求地址出错: ${error.response.config.url}`)
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default fetch
