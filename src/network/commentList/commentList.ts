import ajax from "../index";

export function getCommentFloor(data: {
  art_id: string
  comment_id: string
  offset: number
  limit: number
}) {
  return ajax('/art/getCommentFloor', data, 'get')
}

export function getCommentDetail(data: {
  comment_id: string
}) {
  return ajax('/art/getCommentDetail', data, 'get')
}