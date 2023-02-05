import ajax from '../index'

// 获取用户信息
export function getUserInfo() {
  return ajax('/my/getUserInfo')
}

// 上传图片
export function updateImage(url: string, data: FormData) {
  return ajax('/upload/'+url, data, 'post', {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
  })
}

// 上传背景图片
// export function updateBgimage(data: FormData) {
//   return ajax('/upload/userBgimage', data, 'post', {
//     Authorization: localStorage.getItem("token"),
//     "Content-Type": "multipart/form-data",
//   })
// }

// 更新用户信息
export function udateUserInfo(data: {
  user_pic?: string | null
  nickname?: string | null
  sex?: number | null
  intro?: string | null
  birthday?: bigint | null
  province?: string | null
  city?: string | null
  area?: string | null
  bg_image?: string | null
}) {
  return ajax('/my/updateUserInfo', data, 'post')
}