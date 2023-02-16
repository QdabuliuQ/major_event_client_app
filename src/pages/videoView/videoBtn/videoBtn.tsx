import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js';
import { useNavigate } from "react-router-dom";
import { Toast } from 'react-vant';
import { Star, Chat, GoodJob, More } from '@react-vant/icons';
import { praiseVideo, collectVideo } from "@/network/videoView/videoView";
import "./videoBtn.less"

interface IProps {
  is_praise: number
  praise_count: number
  comment_count: number
  is_collect: number
  collect_count: number
  avatar: string
  visible: boolean
  user_id: string
  video_id: string
}

export default function VideoLeftBtn(props: IProps) {
  const router = useNavigate()

  const [praiseCount, setPraiseCount] = useState(0)
  const [isPraise, setIsPraise] = useState(0)
  const [collectCount, setCollectCount] = useState(0)
  const [isCollect, setIsCollect] = useState(0)

  const praiseEvent = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    let p = isPraise == 1 ? 0 : 1
    praiseVideo({
      is_praise: p,
      video_id: props.video_id
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail(res.msg)
      }
      setIsPraise(p)
      setPraiseCount(p == 1 ? praiseCount + 1 : praiseCount - 1)
    })
  }

  const collectEvent = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    
    let p = isCollect == 1 ? 0 : 1
    collectVideo({
      is_praise: p,
      video_id: props.video_id
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail(res.msg)
      }
      setIsCollect(p)
      setCollectCount(p == 1 ? collectCount + 1 : collectCount - 1)
    })
  }

  const moreEvent = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    PubSub.publish('moreEvent', props.video_id)
  }

  const commentEvent = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
    PubSub.publish('commentDetail', props.video_id)
  }

  useEffect(() => {
    setPraiseCount(props.praise_count)
    setIsPraise(props.is_praise)
    setCollectCount(props.collect_count)
    setIsCollect(props.is_collect)
  }, [props.praise_count, props.is_praise, props.collect_count, props.is_collect])

  return (
    <div style={{opacity: props.visible ? 1 : 0}} id='VideoLeftBtn'>
      <div className='btnItem'>
        <div onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          router('/info', {
            state: {
              id: props.user_id
            }
          })
        }} className='userAvatar'>
          <img src={props.avatar} alt="" />
        </div>
      </div>
      <div onClick={(e: any) => praiseEvent(e)} className='btnItem'>
        <GoodJob fontSize={32} color={isPraise == 1 ? '#409eff' : '#f0f0f0'} />
        <div className='itemCount'>{praiseCount}</div>
      </div>
      <div onClick={(e: any) => commentEvent(e)} className='btnItem'>
        <Chat fontSize={32} color='#f0f0f0' />
        <div className='itemCount'>{props.comment_count}</div>
      </div>
      <div onClick={(e: any) => collectEvent(e)} className='btnItem'>
        <Star fontSize={32} color={isCollect == 1 ? '#409eff' : '#f0f0f0'} />
        <div className='itemCount'>{collectCount}</div>
      </div>
      <div onClick={(e: any) => moreEvent(e)} className='btnItem'>
        <More fontSize={32} />
        <div style={{fontSize: '.375rem', zoom: '.9'}} className='itemCount'>更多</div>
      </div>
    </div>
  )
}
