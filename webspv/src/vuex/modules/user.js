// import api from '../../api'
// import {
//   SUCCESS_GET_SNSLOGINS,
//   FAILURE_GET_SNSLOGINS
// } from '../types'
import { loginByUsername, logout, getCurrentUser } from '../../api/login'
const state = {
  userkey: ''
}

const actions = {
  // 用户名登录
  LoginByUsername({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginByUsername(userInfo.username, userInfo.password).then(response => {
        const data = response.data
        console.log('response', data)
        // sessionStorage.setItem('userName', this.username)
        // setToken(response.data.token)
        commit('SET_USERKEY', data.obj.userkey)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  LogOut({ commit }, outInfo) {
    return new Promise((resolve, reject) => {
      logout(outInfo).then(() => {
        commit('SET_USERKEY', '')
        // commit('SET_ROLES', [])
        // removeToken()
        localStorage.clear()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
   // 获取userkey是否失效
  GetCurrentUser({ commit }, userkey) {
    return new Promise((resolve, reject) => {
      getCurrentUser(userkey).then((res) => {
        console.log(res)
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        // removeToken()
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
//   getSnsLogins({ commit }){
//     api.getSnsLogins().then(response => {
//       if(!response.ok){
//         return commit(FAILURE_GET_SNSLOGINS)
//       }
//       commit(SUCCESS_GET_SNSLOGINS, response.data.data)
//     }, response => {
//       commit(FAILURE_GET_SNSLOGINS)
//     })
//   }
}
const mutations = {
  SET_USERKEY: (state, userkey) => {
    state.userkey = userkey
  }
}

export default {
  state,
  actions,
  mutations
}
