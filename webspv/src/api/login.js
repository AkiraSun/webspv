import fetch from '@/utils/http'
export function loginByUsername(username, password) {
  const data = {
    'account': username,
    'pwd': password
  }
  return fetch({
    url: '/modules/user/UserAction/login',
    method: 'post',
    data
  })
}
export function logout(data) {
  return fetch({
    url: '/modules/user/UserAction/loginout',
    method: 'post',
    data
  })
}
export function getCurrentUser(data) {
  return fetch({
    url: '/modules/user/UserAction/getCurrentUser',
    method: 'post',
    data
  })
}

