import ajax from "..";

export function getVideoList(data: {
  offset: number
}) {
  return ajax({
    url: '/vid/getVideoList', 
    params: data, 
    method: 'get'
  })
}

// 点赞视频
export function praiseVideo(data: {
  is_praise: number
  video_id: string
}) {
  return ajax({
    url: '/vid/praiseVideo', 
    params: data, 
    method: 'get'
  })
}

// 收藏视频
export function collectVideo(data: {
  is_praise: number
  video_id: string
}) {
  return ajax({
    url: '/vid/collectVideo', 
    params: data, 
    method: 'get'
  })
}

// 发表评论
export function pubVideoComment(data: {
  video_id: string
  content: string
}) {
  return ajax({
    url: '/vid/pubVideoComment', 
    data, 
    method: 'post'
  })
}

// 发表评论
export function getVideoComment(data: {
  video_id: string
  offset: number
  pageSize?: number
}) {
  return ajax({
    url: '/vid/getVideoComment', 
    params: data, 
    method: 'get'
  })
}

// 点赞评论
export function praiseVideoComment(data: {
  comment_id: string
  video_id: string
  is_praise: number
}) {
  return ajax({
    url: '/vid/praiseComment', 
    data, 
    method: 'post'
  })
}