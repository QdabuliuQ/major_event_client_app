import ajax from "../index";

// 登录用户
export function loginUser(data: {
  account: string
  password: string
}) {
  return ajax('/api/loginUser', data, 'post')
}