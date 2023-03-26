import ajax from "..";

export function addChatObject(data: {
  to_id: string
}) {
  return ajax({
    url: '/chat/addChatObject', 
    data, 
    method: 'post'
  })
}

// 回复的评论
export function getReplyComment(data: {
  pageSize: number
  offset: number
}) {
  return ajax({
    url: '/com/getReplyComment',
    params: data,
    method: 'get'
  })
}

// 评论点赞的用户
export function getPraiseComment(data: {
  pageSize: number
  offset: number
}) {
  return ajax({
    url: '/com/getPraiseComment',
    params: data,
    method: 'get'
  })
}