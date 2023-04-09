import ajax from "..";

// 发布动态
export function pubEvent(data: {
  type: string
	content: string
	images: string
	resource_id: string
}) {
  return ajax({
    url: '/eve/pubEvent',
    data,
    method: 'post'
  })
}