import ajax from "../index";

export function getCommentFloor(data: {
  art_id: string
  comment_id: string
  offset: number
  limit: number
}) {
  return ajax({
    url: '/art/getCommentFloor', 
    params: data, 
    method: 'get'
  })
}

export function getCommentDetail(data: {
  comment_id: string
}) {
  return ajax({
    url: '/art/getCommentDetail', 
    params: data, 
    method: 'get'
  })
}