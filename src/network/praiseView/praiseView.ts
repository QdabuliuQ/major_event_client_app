import ajax from "../index";

export function getPraiseList(data: {
  offset: number
}) {
  return ajax({
    url: '/pra/getPraiseList/'+data.offset
  })
}


export function getBrowseList(data: {
  offset: number
}) {
  return ajax({
    url: '/pra/getBrowseList/'+data.offset
  })
}