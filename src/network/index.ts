import axios from 'axios'
import { Toast } from 'react-vant';
import v from "@/utils/globarVar";

export default function ajax(url: string, data={}, type='GET', header?: any) {
  return new Promise((resolve, reject) => {
    let promise
    let u = url.indexOf('/upload') == -1 ? v.url + url : v.o_url + url
    // 1. 执行异步ajax请求
    if(type.toUpperCase()==='GET') { // 发GET请求
      promise = axios.get(u, { // 配置对象
        params: data, // 指定请求参数
        headers: header ? header : {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('token') ?? '' 
        },
      })
    } else { // 发POST请求
      promise = axios.post(u, data, {
        headers: header ? header : {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('token') ?? '' 
        },
      })
    }
    // 2. 如果成功了, 调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
    }).catch(error => {
      // reject(error)
      Toast.fail('网络异常')
    })
  })
}