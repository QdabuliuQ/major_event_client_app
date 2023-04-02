import { PlayCircleO } from '@react-vant/icons'
import React, { memo } from 'react'
import { Image, Typography } from 'react-vant'
import "./sendVideoInfo.less"

interface IProps {
  cover_img: string
  title: string
  nickname?: string
  time?: number
}

export default memo(function SendVideoInfo(props: IProps) {
  return (
    <div className='SendVideoInfo'>
      <div className='mask'></div>
      <Image fit='cover' src={props.cover_img} />
      <PlayCircleO />
      <div className='videoInfo'>
        {
          props.nickname ? <div className='userName'>
            @{props.nickname}
          </div> : ''
        }
        <Typography.Text ellipsis={2}>{props.title}</Typography.Text>
        <div className='pubTime'>
          {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}) 
