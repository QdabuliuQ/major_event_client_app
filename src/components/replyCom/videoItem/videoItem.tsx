import React, { memo } from 'react'
import { PlayCircleO } from '@react-vant/icons'
import "./videoItem.less"
import { Typography } from 'react-vant'
import { useRouter } from '@/hooks/useRouter'

interface IProps {
  id: string
  cover_img: string
  time: number
  title: string
  toDetail?: boolean
}

export default memo(function VideoItem(props: IProps) {

  const { router } = useRouter()
  const toPage = (e: any) => {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    router('/video/'+props.id)
  }

  return (
    <div onClick={(e) => props.toDetail && toPage(e)} className='Event_VideoItem'>
      <div className='videoContainer'>
        <img src={props.cover_img} />
        <div className='mask'>
          <PlayCircleO  />
          <div className='info'>
            <Typography.Text ellipsis={2}>{props.title}</Typography.Text>
            <span className='other'>发布时间：{(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}) 
