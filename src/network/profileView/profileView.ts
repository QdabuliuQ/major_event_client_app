import ajax from '../index'

// 获取用户信息
export function getUserInfo() {
  return ajax({
    url: '/my/getUserInfo'
  })
}

// 获取前台公告
export function getReceNoticeList(data: {
  offset: number,
  pageSize: number
}) {
  return ajax({
    url: '/my/getReceNoticeList',
    params: data,
    method: 'get'
  })
}

export function getReceNoticeDetail(data: {
  id: string
}) {
  return ajax({
    url: '/my/getReceNoticeDetail',
    data,
    method: 'post'
  })
}