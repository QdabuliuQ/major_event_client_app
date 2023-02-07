import ajax from "..";

export function getVideoList(data: {
  offset: number
}) {
  return ajax('/vid/getVideoList', data, 'get')
}