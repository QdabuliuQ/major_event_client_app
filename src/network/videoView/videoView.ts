import ajax from "..";

export function getVideoList(data: {
  offset: number
}) {
  return ajax('/vid/getVideoList', data, 'get')
}

// 点赞视频
export function praiseVideo(data: {
  is_praise: number
  video_id: string
}) {
  return ajax('/vid/praiseVideo', data, 'get')
}

// 收藏视频
export function collectVideo(data: {
  is_praise: number
  video_id: string
}) {
  return ajax('/vid/collectVideo', data, 'get')
}

// 发表评论
export function pubVideoComment(data: {
  video_id: string
  content: string
}) {
  return ajax('/vid/pubVideoComment', data, 'post')
}

// 发表评论
export function getVideoComment(data: {
  video_id: string
  offset: number
  pageSize: number
}) {
  return ajax('/vid/getVideoComment', data, 'get')
}

// 点赞评论
export function praiseVideoComment(data: {
  comment_id: string
  video_id: string
  is_praise: number
}) {
  return ajax('/vid/praiseComment', data, 'post')
}