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

// 发送消息
export function addMessageRecord(data: {
  type: string
  to_id: string
  room_id: string
  resource?: string
}) {
  return ajax({
    url: '/chat/addMessageRecord',
    data,
    method: 'post'
  })
}

// 获取聊天
export function getMessageList(data: {
  room_id: string
  pageSize: number
  offset: number
}) {
  return ajax({
    url: '/chat/getMessageList',
    data,
    method: 'post'
  })
}

// 获取聊天对象
export function getChatObject(data: {
  offset: number
  pageSize: number
}) {
  return ajax({
    url: '/chat/getChatObject',
    data,
    method: 'post'
  })
}