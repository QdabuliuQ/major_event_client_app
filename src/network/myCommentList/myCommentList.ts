import ajax from "..";

export function getCommentById(data: {
  offset: number
  type: number
}) {
  return ajax({
    url: '/com/getCommentById', 
    data, 
    method: 'get'
  })
}

export function deleteCommentById(data: {
  comment_id: string
  type: string
}) {
  return ajax({
    url: '/com/deleteCommentById', 
    data, 
    method: 'post'
  })
}