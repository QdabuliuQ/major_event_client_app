import ajax from "..";

export function getArticleReportDetail(data: {
  id: string
}) {
  return ajax('/rep/getArticleReportDetail/'+data.id, {}, 'get')
}