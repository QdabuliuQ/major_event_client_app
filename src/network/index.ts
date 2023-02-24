import axios from 'axios'
import { Toast } from 'react-vant';
import v from "@/utils/globarVar";

export const getToken = (): string => {
  return localStorage.getItem('token') ?? ''
}

const ajax = axios.create({
  baseURL: v.url,
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
  },
  timeout: 5000,
})

// 请求拦截器
ajax.interceptors.request.use(function (config: any) {
  // 发送请求的相关逻辑
  // config:对象  与 axios.defaults 相当
  // 借助config配置token
  let token = getToken()
  // 判断token存在再做配置
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
ajax.interceptors.response.use((req: any): any => {
  if(req.data.status == -1) {
    Toast.fail('登录失效')
    localStorage.removeItem('info')
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    window.location.href = window.location.protocol + '//' + window.location.host + '/login'
  } else {
    return req.data
  }
}, err=>{});


export default ajax 