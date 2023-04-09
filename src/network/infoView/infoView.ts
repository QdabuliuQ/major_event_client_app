import ajax from '../index'

export function getUserInfoById(data: {
  id: string
}) {
  return ajax({
    url: '/my/getUserInfoById/'+data.id,
    method: 'get'
  })
}

export function getUserArticleById(data: {
  id: string
  offset: number
}) {
  return ajax({
    url: '/my/getUserArticleById', 
    params: data, 
    method: 'get'
  })
}

export function getUserCollectById(data: {
  id: string
  offset: number
}) {
  return ajax({
    url: '/my/getUserCollectById', 
    params: data, 
    method: 'get'
  })
}

export function getUserCollectVideoById(data: {
  id: string
  offset: number
}) {
  return ajax({
    url: '/my/getUserCollectVideoById', 
    params: data, 
    method: 'get'
  })
}

export function getUserVideoById(data: {
  id: string
  offset: number
}) {
  return ajax({
    url: '/my/getUserVideoById', 
    params: data, 
    method: 'get'
  })
}


export function updateFollowUser(data: {
  follow_id: string
  is_follow: number
}) {
  return ajax({
    url: '/my/updateFollowUser', 
    data, 
    method: 'post'
  })
}

// 获取动态列表
export function getEventListById(data: {
  offset: number
  id: string
}) {
  return ajax({
    url: '/eve/getEventListById',
    params: data,
    method: 'get'
  })
}