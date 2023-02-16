import React from 'react'
import { useNavigate } from "react-router-dom";
import { PlayCircleO } from '@react-vant/icons';
import { Image, Typography } from 'react-vant';
import "./videoItem.less"

interface IProps {
  cover_img: string
  title: string
  time: number
  nickname: string
  user_pic: string
  user_id: string
}

export default function VideoItem(props: IProps) {
  const router = useNavigate()
  
  return (
    <div className='VideoItem'>
      <div className='itemCoverImg'>
        <div className='mask'>'
          <PlayCircleO color='#fff' fontSize={60} />
        </div>
        <img src={props.cover_img} alt="" />
      </div>
      <div className='itemInfo'>
      <Typography.Text ellipsis={2}>{ props.title}</Typography.Text>
        <div className='infoTime'>
          {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
        </div>
        <div onClick={() => {
          router('/info', {
            state: {
              id: props.user_id
            }
          })
        }} className='creator'>
          <Image round fit='cover' width='7vw' height='7vw' src={props.user_pic} />
          { props.nickname }
        </div>
      </div>
    </div>
  )
}
