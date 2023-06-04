import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Empty, Toast } from 'react-vant'
import { getEventListById } from '@/network/infoView/infoView'
import EventItem from '@/components/eventItem/eventItem'
import { EventInt } from '@/interface/global'
import SkeletonEvent from "@/components/skeletonEvent/skeletonEvent";
import "./infoEvent.less"
let infoEvent_offset = 1

export const InfoEvent = forwardRef(({ }, ref) => {
  const { id } = useParams()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [more, setMore] = useState(true)
  const [list, setList] = useState<EventInt[]>([])

  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset
  }))

  const setOffset = () => {
    infoEvent_offset = 1
  }

  // 获取数据
  const getData = () => {
    if(infoEvent_offset == 1) setLoading(true)
    getEventListById({
      id: id as string,
      offset: infoEvent_offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      setMore(res.more)
      if (infoEvent_offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
      setLoading(false)
      infoEvent_offset++
    })
  }

  useEffect(() => {
    infoEvent_offset = 1
    getData()
  }, [location.pathname])

  return (
    <div id='InfoEvent'>
      {
        loading ? <SkeletonEvent /> : !loading && list.length ? (
          list.map((item: any) => (
            <EventItem
              key={item.ev_id}
              commentCount={item.commentCount}
              ev_id={item.ev_id}
              nickname={item.nickname}
              user_id={item.user_id}
              user_pic={item.user_pic}
              time={item.time}
              type={item.type}
              content={item.content}
              images={item.images}
              resource_id={item.resource_info}
              resource_info={item.resource_info}
              is_praise={item.isPraise}
              praise_count={item.praiseCount}
              shareCount={item.shareCount}
            />
          ))
        ) : <Empty description="暂无发布动态" />
      }
    </div>
  )
}) 