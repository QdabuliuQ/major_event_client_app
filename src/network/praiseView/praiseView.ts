import ajax from "../index";

export function getPraiseList(data: {
  offset: number
}) {
  return ajax({
    url: '/pra/getPraiseList/'+data.offset
  })
}

// 获取文章浏览记录
export function getBrowseList(data: {
  offset: number
}) {
  return ajax({
    url: '/pra/getBrowseList/'+data.offset
  })
}

// 获取视频点赞记录
export function getVideoPraiseList(data: {
  offset: number
}) {
  return ajax({
    url: '/pra/getVideoPraiseList/'+data.offset
  })
}