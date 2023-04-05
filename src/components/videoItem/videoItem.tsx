import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { PlayCircleO } from '@react-vant/icons';
import { Image, Toast, Typography } from 'react-vant';
import { touchStateEvent, tourchEndEvent } from '@/utils/tools';
import { collectVideo } from '@/network/videoView/videoView';
import "./videoItem.less"

interface IProps {
  cover_img: string
  title: string
  time: number
  nickname: string
  user_pic: string
  user_id: string
  id: string
  collect?: boolean
  collectCb?: Function
  index?: number
}

export default function VideoItem(props: IProps) {
  const router = useNavigate()
  const [show, setShow] = useState(false)
  let flag: boolean = true

  const touchStart = () => {
    flag = false
    setShow(true)
  }
  const touchEnd = () => {
    flag = true
  }

  const cancelCollect = (e: any) => {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    collectVideo({
      is_praise: 0,
      video_id: props.id
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      props.collectCb && props.collectCb(props.index)
    })
  }
  const toDetail = () => {
    console.log(flag);
    
    if(flag) router('/video/' + props.id)
  }

  return (
    <div 
      onTouchStart={(e) => touchStateEvent(e, touchStart)} 
      onTouchEnd={(e) => tourchEndEvent(e, touchEnd)}
      onClick={toDetail} className='VideoItem'>
      <div className='itemCoverImg'>
        {
          props.collect && show ? <div onClick={(e) => cancelCollect(e)} className='collectMask'>
            取消收藏
          </div> : ''
        }
        <div className='mask'>'
          <PlayCircleO color='#fff' fontSize={60} />
        </div>
        <img src={props.cover_img} alt="" />
      </div>
      <div className='itemInfo'>
        <Typography.Text ellipsis={2}>{props.title}</Typography.Text>
        <div className='infoTime'>
          {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          router('/info', {
            state: {
              id: props.user_id
            }
          })
        }} className='creator'>
          <Image round fit='cover' width='7vw' height='7vw' src={props.user_pic} />
          {props.nickname}
        </div>
      </div>
    </div>
  )
}
