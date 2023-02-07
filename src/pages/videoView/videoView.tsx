import React, { useEffect, useRef, useState } from 'react'
import { Toast, Swiper } from 'react-vant';
import VideoNav from "./videoNav/videoNav";
import { getVideoList } from "@/network/videoView/videoView";
import VideoContent from "./videoContent/videoContent";
import "./videoView.less"

let offset = 1

export default function VideoView() {

  const [idx, setIdx] = useState(0)
  const [list, setList] = useState<{
    cover_img: string
    id: string
    nickname: string
    state: string
    time: number
    title: string
    user_id: string
    user_pic: string
    duration: number
    video_url: string
  }[]>([])

  const getData = () => {
    getVideoList({
      offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      setList(res.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id='VideoView'>
      <VideoNav />
      <Swiper indicator={false} loop={false} vertical style={{ height: '100%' }}>
        {
          list.map((item,index) => (
            <Swiper.Item key={item.id}>
              <VideoContent
                isPlay={index == idx}
                length={item.duration}
                nickname={item.nickname}
                title={item.title}
                time={item.time}
                avatar={item.user_pic}
                praise_count={1241}
                comment_count={532}
                collect_count={612}
                video_url={item.video_url} />
            </Swiper.Item>
          ))
        }
      </Swiper>
    </div>
  )
}
