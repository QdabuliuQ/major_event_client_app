import ajax from "..";

export function getVideoById(data: {
  state: string
  offset: number
  pageSize?: number
}) {
  return ajax({
    url: '/vid/getVideoById', 
    params: data, 
    method: 'get'
  })
}

export function deleteVideoById(data: {
  id: string
}) {
  return ajax({
    url: '/vid/deleteVideoById', 
    data, 
    method: 'post'
  })
}