import ajax from '../index'

export function getUserInfoById(data: {
  id: string
}) {
  return ajax('/my/getUserInfoById/'+data.id, {}, 'get')
}

export function getUserArticleById(data: {
  id: string
  offset: number
}) {
  return ajax('/my/getUserArticleById', data, 'get')
}

export function getUserCollectById(data: {
  id: string
  offset: number
}) {
  return ajax('/my/getUserCollectById', data, 'get')
}

export function updateFollowUser(data: {
  follow_id: string
  is_follow: number
}) {
  return ajax('/my/updateFollowUser', data, 'post')
}