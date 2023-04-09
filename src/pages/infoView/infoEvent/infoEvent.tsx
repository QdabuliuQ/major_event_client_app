import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Empty, Toast } from 'react-vant'
import { getEventListById } from '@/network/infoView/infoView'
import EventItem from '@/components/eventItem/eventItem'
import "./infoEvent.less"
let infoEvent_offset = 1

export const InfoEvent = forwardRef(({ }, ref) => {
  const { id } = useLocation().state
  const router = useNavigate()
  const [more, setMore] = useState(true)
  const [list, setList] = useState<any>([])

  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset
  }))

  const setOffset = () => {
    infoEvent_offset = 1
  }
  const getData = () => {
    getEventListById({
      id: id as string,
      offset: infoEvent_offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      setMore(res.more)
      setList([...list, ...res.data])
      infoEvent_offset++
    })
  }

  useEffect(() => {
    infoEvent_offset = 1
    getData()
  }, [])

  return (
    <div id='InfoEvent'>
      {
        list.length ? (
          list.map((item: any) => (
            <EventItem
              key={item.ev_id}
              nickname={item.nickname}
              user_id={item.user_id}
              user_pic={item.user_pic}
              time={item.time}
              type={item.type}
              content={item.content}
              images={item.images}
              resource_id={item.resource_info}
              resource_info={item.resource_info}
            />
          ))
        ) : <Empty description="暂无发布动态" />
      }
    </div>
  )
}) 