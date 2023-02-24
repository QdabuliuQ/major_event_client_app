import ajax from '../index'

// 获取用户信息
export function getUserInfo() {
  return ajax({
    url: '/my/getUserInfo'
  })
}