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