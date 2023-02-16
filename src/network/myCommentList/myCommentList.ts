import ajax from "..";

export function getCommentById(data: {
  offset: number
  type: number
}) {
  return ajax('/com/getCommentById', data, 'get')
}

export function deleteCommentById(data: {
  comment_id: string
  type: string
}) {
  return ajax('/com/deleteCommentById', data, 'post')
}