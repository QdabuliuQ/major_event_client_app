import ajax from "..";

export function getArticleReportList(data: {
  offset: number
}) {
  return ajax('/rep/getArticleReportList', data, 'get')
}

export function getCommentReportList(data: {
  offset: number
}) {
  return ajax('/rep/getCommentReportList', data, 'get')
}