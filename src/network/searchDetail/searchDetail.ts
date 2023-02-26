import ajax from "..";

export function getAllSearch(data: {
  key: string
}) {
  return ajax({
    url: '/sea/getAllSearch',
    method: 'get',
    params: data
  })
}

export function getArticleSearch(data: {
  offset: number
  key: string
}) {
  return ajax({
    url: '/sea/getArticleSearch',
    method: 'get',
    params: data
  })
}

export function getVideoSearch(data: {
  offset: number
  key: string
}) {
  return ajax({
    url: '/sea/getVideoSearch',
    method: 'get',
    params: data
  })
}

export function getUserSearch(data: {
  offset: number
  key: string
}) {
  return ajax({
    url: '/sea/getUserSearch',
    params: data,
    method: 'get'
  })
}
