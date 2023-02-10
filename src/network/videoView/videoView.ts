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