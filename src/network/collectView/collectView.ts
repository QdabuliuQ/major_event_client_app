import ajax from "../index";

// 获取收藏列表
export function getCollectList(data: {
  offset: number
  pageSize?: number
}) {
  return ajax('/res/getCollectList/'+data.offset)
}

export function getCollectVideo(data: {
  offset: number
  pageSize?: number
}) {
  return ajax('/res/getCollectVideo', data, 'get')
}