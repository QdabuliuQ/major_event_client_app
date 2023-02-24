import ajax from "..";

export function getArticleReportDetail(data: {
  id: string
}) {
  return ajax({
    url: '/rep/getArticleReportDetail/'+data.id, 
    method: 'get'
  })
}