import ajax from '../index'

// 获取文章详情
export function getArticleDetail(data: {
  id: string
}) {
  return ajax({
    url: '/art/getArticleDetail/'+data.id
  })
}

// 获取文章信息
export function getArticleParams(data: {
  id: string
}) {
  return ajax({
    url: '/art/getArticleParams/'+data.id
  })
}

// 点赞/取消点赞
export function praiseArticle(data: {
  id: string
  is_praise: number
}) {
  return ajax({
    url: '/art/praiseArticle', 
    data, 
    method: 'post'
  })
}

// 收藏/取消收藏文章
export function collectArticle(data: {
  id: string
  is_collect: number
}) {
  return ajax({
    url: '/art/collectArticle', 
    data, 
    method: 'post'
  })
}

// 获取评论
export function getArticleComment(data: {
  art_id: string
  offset: number
  limit: number
  order: string
}){
  return ajax({
    url: '/art/getArticleComment', 
    params: data, 
    method: 'get'
  })
}

// 点赞评论
export function praiseComment(data: {
  comment_id: string
  art_id: string
  is_praise: number
}) {
  return ajax({
    url: '/art/praiseComment', 
    data, 
    method: 'post'
  })
}