import ajax from ".."

// 发布评论
export function addEventComment(data: {
  ev_id: string
  content: string
}) {
  return ajax({
    url: '/eve/addEventComment',
    data,
    method: 'post'
  })
}

// 获取动态评论
export function getEventComment(data: {
  offset: number
  ev_id: string
}) {
  return ajax({
    url: '/eve/getEventComment',
    params: data,
    method: 'get'
  })
}

// 点赞动态评论
export function praiseComment(data: {
  ev_id: string
  comment_id: string
  is_praise: number
}) {
  return ajax({
    url: '/eve/praiseComment',
    data,
    method: 'post'
  })
}

// 点赞动态
export function praiseEvent(data: {
  ev_id: string
  is_praise: number
}) {
  return ajax({
    url: '/eve/praiseEvent',
    data,
    method: 'post'
  })
}

// 动态点赞列表
export function getEventPraiseList(data: {
  offset: number
  ev_id: string
}) {
  return ajax({
    url: '/eve/getEventPraiseList',
    params: data,
    method: 'get'
  })
}

// 动态删除
export function deleteEvent(data: {
  ev_id: string
})  {
  return ajax({
    url: '/eve/deleteEvent',
    data,
    method: 'post'
  })
}

// 动态转发
export function getEventReplyList(data: {
  offset: number
  ev_id: string
}) {
  return ajax({
    url: '/eve/getEventReplyList',
    params: data,
    method: 'get'
  })
}

// 获取动态数据
export function getEventData(data: {
  ev_id: string
}) {
  return ajax({
    url: '/eve/getEventData',
    params: data,
    method: 'get'
  })
}

// 举报动态
export function reportEvent(data: {
  ev_id: string
  reason: string
}) {
  return ajax({
    url: '/eve/reportEvent',
    data,
    method: 'post'
  })
}