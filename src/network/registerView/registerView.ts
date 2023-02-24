import ajax from "../index";

// 注册用户
export function registerUser(data: {
  email: string
  phone: string
  password: string
}) {
  return ajax({
    url: '/api/registerUser', 
    data, 
    method: 'post'
  })
}

