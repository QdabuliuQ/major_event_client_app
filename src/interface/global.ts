export interface MessageInt {
  my_user_pic: string
  from_id: string
  my_id: string
  from_user_nickname: string
  from_user_pic: string
  msg_id: string
  resource: string
  resource_info: any
  room_id: string
  time: number
  to_id: string
  type: string
}

export interface ActionInt {
  type: string
  data: any
}

export interface MenuInt {
  title: string
  click: Function
}

export interface EventInt {
  commentCount: number
  content: string
  ev_id: string
  images: string
  nickname: string
  resource_id: string
  resource_info: any
  state: string
  time: number
  type: string
  user_id: string
  user_pic: string
  praiseCount: number
  isPraise: number
}




