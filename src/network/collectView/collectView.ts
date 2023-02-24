import ajax from "../index";

// 获取收藏列表
export function getCollectList(data: {
  offset: number
  pageSize?: number
}) {
  return ajax({
    url: '/res/getCollectList/'+data.offset
  })
}

export function getCollectVideo(data: {
  offset: number
  pageSize?: number
}) {
  return ajax({
    url: '/res/getCollectVideo', 
    data, 
    method: 'get'
  })
}