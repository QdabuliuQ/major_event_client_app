import ajax from "../index";

export function getUserFollow(data: {
  offset: number
  id: string
}) {
  return ajax('/my/getUserFollow', data, 'get')
}

export function getUserFans(data: {
  offset: number
  id: string
}) {
  return ajax('/my/getUserFans', data, 'get')
}