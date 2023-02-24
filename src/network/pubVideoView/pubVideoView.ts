import ajax from "..";

export function pubVideo(data: {
  title: string
  cover_img: string
  video_url: string
  duration: number
}) {
  return ajax({
    url: '/vid/pubVideo', 
    data, 
    method: 'post'
  })
}