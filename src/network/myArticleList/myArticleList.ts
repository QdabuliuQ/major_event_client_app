import ajax from "..";

export function getArticleById(data: {
  offset: number
  type?: string
  pageSize?: number
}) {
  return ajax({
    url: '/art/getArticleById', 
    params: data, 
    method: 'get'
  })
}

export function deleteArticleById(data: {
  id: string
}) {
  return ajax({
    url: '/art/deleteArticleById', 
    data, 
    method: 'post'
  })
}