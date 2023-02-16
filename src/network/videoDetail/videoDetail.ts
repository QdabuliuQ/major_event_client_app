import ajax from "..";

export function getVideoDetail(data: {
  id: string
}) {
  return ajax('/vid/getVideoDetail', data, 'get')
}
