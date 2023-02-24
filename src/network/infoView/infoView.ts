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