import ajax from '../index'

export function getArticleList(data: {
  id?: string
  offset: number
  limit: number
}) {
  return ajax({
    url: `/art/getArticleList`, 
    params: data
  })
}