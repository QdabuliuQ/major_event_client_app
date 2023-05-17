import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Empty, Toast } from 'react-vant';
import { getUserVideoById } from "@/network/infoView/infoView";
import VideoItem from "@/components/videoItem/videoItem";
import SkeletonVideo from "@/components/skeletonVideo/skeletonVideo";
import "./infoVideo.less"

let infoVideo_offset = 1

const InfoVideo = forwardRef(({ }, ref) => {
  const { id } = useLocation().state
  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset,
    loading
  }))

  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any>([])
  const [more, setMore] = useState(true)

  const setOffset = () => {
    infoVideo_offset = 1
  }

  const getData = () => {
    if (infoVideo_offset == 1) setLoading(true)
    getUserVideoById({
      id: id as string,
      offset: infoVideo_offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      setMore(res.more)
      setList([...list, ...res.data])
      infoVideo_offset++
      setLoading(false)
    })
  }

  useEffect(() => {
    infoVideo_offset = 1
    getData()
  }, [])

  return (
    loading ? <SkeletonVideo /> : !loading && list.length ? <div id="InfoVideo">
      {
        list.map((item: any) => (
          <VideoItem
            key={item.id}
            cover_img={item.cover_img}
            id={item.id}
            title={item.title}
            time={item.pub_date}
            nickname={item.nickname}
            user_pic={item.user_pic}
            user_id={item.user_id}
          />
        )
        )
      }
    </div> : <Empty description="暂无发布视频" />
  )
})

export default InfoVideo
