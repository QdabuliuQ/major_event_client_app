import ajax from "..";

export function getVideoDetail(data: {
  id: string
}) {
  return ajax({
    url: '/vid/getVideoDetail',
    params: data,
    method: 'get'
  })
}
