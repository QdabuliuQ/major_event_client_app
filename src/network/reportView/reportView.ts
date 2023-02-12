import ajax from "../index";

// 举报文章
export function addArticleReport(data: {
  reason: string
  desc: string
  proof?: string
  art_id: string
}) {
  return ajax('/rep/addArticleReport', data, 'post')
}

export function getReportReason(data?: {
  type: string
}) {
  return ajax('/rep/getReportReason', data, 'get')
}

export function addCommentReport(data?: {
  reason: string
  comment_id: string
  type: string
}) {
  return ajax('/rep/addCommentReport', data, 'post')
}