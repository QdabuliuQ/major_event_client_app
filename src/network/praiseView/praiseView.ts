import ajax from "../index";

export function getPraiseList(data: {
  offset: number
}) {
  return ajax('/pra/getPraiseList/'+data.offset)
}


export function getBrowseList(data: {
  offset: number
}) {
  return ajax('/pra/getBrowseList/'+data.offset)
}