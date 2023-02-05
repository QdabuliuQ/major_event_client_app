import ajax from "../index";

// 获取收藏列表
export function getCollectList(data: {
  offset: number
}) {
  return ajax('/res/getCollectList/'+data.offset)
}