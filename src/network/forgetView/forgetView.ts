import ajax from '../index'

// 获取用户信息
export function forgetPassword(data: {
  password: string
  re_password: string
  email: string
  phone: string
}) {
  return ajax({
    url: '/api/forgetPassword',
    method: 'post',
    data
  })
}