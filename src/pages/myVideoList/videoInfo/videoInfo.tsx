import React from 'react'
import { PlayCircleO } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'react-vant'
import "./videoInfo.less"

interface IProps {
  title: string
  time: number
  cover_img: string
  video_id?: string
  style?: any
}

export default function VideoInfo(props: IProps) {
  const router = useNavigate()

  return (
    <div onClick={() => {
      props.video_id && router('/video/'+props.video_id)
    }} style={{...props.style}} className='VideoInfo'>
      <div className='leftInfo'>
        <div className='infoTitle'>
          <Typography.Text ellipsis={2}>{props.title}</Typography.Text>
        </div>
        <div className='infoTime'>{(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
      <div className='rightInfo'>
        <div className='video_cover'>
          <PlayCircleO color='#fff' fontSize={40} />
          <img src={props.cover_img} />
        </div>
      </div>
    </div>
  )
}
