import ajax from "..";

// 获取举报文章记录
export function getArticleReportList(data: {
  offset: number
}) {
  return ajax('/rep/getArticleReportList', data, 'get')
}

// 获取举报评论记录
export function getCommentReportList(data: {
  offset: number
}) {
  return ajax('/rep/getCommentReportList', data, 'get')
}

// 获取举报视频记录
export function getVideoReportList(data: {
  offset: number
}) {
  return ajax('/rep/getVideoReportList', data, 'get')
}