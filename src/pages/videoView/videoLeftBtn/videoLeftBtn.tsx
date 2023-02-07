import React from 'react'
import { Star, Chat, GoodJob } from '@react-vant/icons';
import "./videoLeftBtn.less"

interface IProps {
  praise_count: number
  comment_count: number
  collect_count: number
  avatar: string
  visible: boolean
}

export default function VideoLeftBtn(props: IProps) {
  return (
    <div style={{opacity: props.visible ? 1 : 0}} id='VideoLeftBtn'>
      <div className='btnItem'>
        <div className='userAvatar'>
          <img src={props.avatar} alt="" />
        </div>
      </div>
      <div className='btnItem'>
        <GoodJob fontSize={32} color='#f0f0f0' />
        <div className='itemCount'>{props.praise_count}</div>
      </div>
      <div className='btnItem'>
        <Chat fontSize={32} color='#f0f0f0' />
        <div className='itemCount'>{props.comment_count}</div>
      </div>
      <div className='btnItem'>
        <Star fontSize={32} color='#f0f0f0' />
        <div className='itemCount'>{props.collect_count}</div>
      </div>
    </div>
  )
}
