import ajax from '../index'

// 获取文章详情
export function getArticleDetail(data: {
  id: string
}) {
  return ajax('/art/getArticleDetail/'+data.id)
}

// 获取文章信息
export function getArticleParams(data: {
  id: string
}) {
  return ajax('/art/getArticleParams/'+data.id)
}

// 点赞/取消点赞
export function praiseArticle(data: {
  id: string
  is_praise: number
}) {
  return ajax('/art/praiseArticle', data, 'post')
}

// 收藏/取消收藏文章
export function collectArticle(data: {
  id: string
  is_collect: number
}) {
  return ajax('/art/collectArticle', data, 'post')
}

// 获取评论
export function getArticleComment(data: {
  art_id: string
  offset: number
  limit: number
}){
  return ajax('/art/getArticleComment', data, 'get')
}

// 点赞评论
export function praiseComment(data: {
  comment_id: string
  art_id: string
  is_praise: number
}) {
  return ajax('/art/praiseComment', data, 'post')
}