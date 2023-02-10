import React, { useEffect, useRef, useState } from 'react'
import { Toast, Swiper } from 'react-vant';
import VideoNav from "./videoNav/videoNav";
import { getVideoList } from "@/network/videoView/videoView";
import VideoContent from "./videoContent/videoContent";
import "./videoView.less"

let offset = 1

export default function VideoView() {

  let more = true
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
    praise_count: number
    comment_count: number
    collect_count: number
    is_praise: number
    is_collect: number
    video_url: string
  }[]>([])

  const getData = () => {
    if(more) {
      getVideoList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        setList([...list, ...res.data])
        more = res.more
      })
    }
    
  }

  const onChange = (e: number) => {
    if(e != -1) {
      // 下拉加载 下一页数据
      if(e == list.length - 1) {
        offset ++
        getData()
      }
      setIdx(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id='VideoView'>
      <VideoNav />
      <Swiper onChange={onChange} indicator={false} loop={false} vertical style={{ height: '100%' }}>
        {
          list.map((item,index) => (
            <Swiper.Item key={item.id}>
              <VideoContent
                isPlay={index == idx}
                {...item} />
              {/* <VideoContent
                isPlay={index == idx}
                video_id={item.id}
                user_id={item.user_id}
                length={item.duration}
                nickname={item.nickname}
                title={item.title}
                time={item.time}
                avatar={item.user_pic}
                praise_count={item.praise_count}
                comment_count={532}
                collect_count={612}
                video_url={item.video_url} /> */}
            </Swiper.Item>
          ))
        }
      </Swiper>
    </div>
  )
}
