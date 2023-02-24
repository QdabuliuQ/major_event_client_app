import ajax from "../index";

// 发表评论
export function pubArticleComment(data: {
  art_id: string
  content: string
  parent_id?: string
}) {
  return ajax({
    url: '/art/pubArticleComment', 
    data, 
    method: 'post'
  })
}