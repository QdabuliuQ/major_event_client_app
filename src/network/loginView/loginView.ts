import ajax from "../index";

// 登录用户
export function loginUser(data: {
  account: string
  password: string
}) {
  return ajax({
    url: '/api/loginUser', 
    data, 
    method: 'post'
  })
}