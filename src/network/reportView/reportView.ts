import ajax from "../index";

// 举报文章
export function addReport(data: {
  reason: string
  desc: string
  proof?: string
  id: string
  type: string
}) {
  return ajax({
    url: '/rep/addReport', 
    data, 
    method: 'post'
  })
}

export function getReportReason(data?: {
  type: string
}) {
  return ajax({
    url: '/rep/getReportReason', 
    params: data, 
    method: 'get'
  })
}

export function addCommentReport(data?: {
  reason: string
  comment_id: string
  type: string
}) {
  return ajax({
    url: '/rep/addCommentReport', 
    data, 
    method: 'post'
  })
}