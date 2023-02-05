import ajax from '../index'

// 获取分类信息
export function getArticleCate() {
  return ajax('/art/getArticleCate')
}

// 发布文章
export function addArticle(data: {
  title: string
  content: string
  cover_img: string
  cate_id: string
  targets: string
}) {
  return ajax('/art/addArticle', data, 'post')
}