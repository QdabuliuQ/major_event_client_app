import ajax from "../index";

export function getUserFollow(data: {
  offset: number
  id: string
  val?: string
}) {
  return ajax({
    url: '/my/getUserFollow', 
    params: data, 
    method: 'get'
  })
}

export function getUserFans(data: {
  offset: number
  id: string
}) {
  return ajax({
    url: '/my/getUserFans', 
    params: data, 
    method: 'get'
  })
}