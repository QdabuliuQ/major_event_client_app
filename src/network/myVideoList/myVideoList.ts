import ajax from "..";

export function getVideoById(data: {
  state: string
  offset: number
  pageSize?: number
}) {
  return ajax('/vid/getVideoById', data, 'get')
}

export function deleteVideoById(data: {
  id: string
}) {
  return ajax('/vid/deleteVideoById', data, 'post')
}