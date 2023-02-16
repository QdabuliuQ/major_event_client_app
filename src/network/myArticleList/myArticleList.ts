import ajax from "..";

export function getArticleById(data: {
  offset: number
  type?: string
  pageSize?: number
}) {
  return ajax('/art/getArticleById', data, 'get')
}

export function deleteArticleById(data: {
  id: string
}) {
  return ajax('/art/deleteArticleById', data, 'post')
}