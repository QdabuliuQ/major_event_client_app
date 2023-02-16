import React from 'react'
import { useNavigate } from "react-router-dom";
import { ChatO, DeleteO, GoodJobO, PlayCircleO, StarO, VideoO } from '@react-vant/icons';
import { Typography, Tag, Button } from 'react-vant';
import VideoInfo from "../videoInfo/videoInfo";
import "./videoItem.less"

interface IProps {
  collect_count: number
  comment_count: number
  cover_img: string
  duration: number
  id: string
  praise_count: number
  state: string
  time: number
  title: string
  user_id: string
  video_url: string
  index: number
  deleteEvent: (id: string, index: number) => void
}

export default function VideoItem(props: IProps) {
  const router = useNavigate()

  const clickEvent = () => {
    if(props.state == '2') {
      router('/video/' + props.id)
    }
  }

  return (
    <div className='_VideoItem'>
      <div className='infoItem'>
        <div className='leftInfo'>
          视频状态
        </div>
        <div className='rightInfo'>
          {
            props.state == '1' ? <Tag color="rgb(177 177 177)">审核中</Tag>
              : props.state == '2' ? <Tag type="success">正常</Tag>
                : props.state == '3' ? <Tag type="danger">封禁</Tag>
                  : <Tag type="warning">删除</Tag>
          }
        </div>
      </div>
      <VideoInfo 
        title={props.title}
        time={props.time}
        cover_img={props.cover_img}
      />
      <div className='dataItem'>
        <div className='item'>
          <GoodJobO fontSize={16} />
          <div>{props.praise_count ? props.praise_count : '点赞'}</div>
        </div>
        <div className='item'>
          <ChatO fontSize={16} />
          <div>{props.comment_count ? props.comment_count : '评论'}</div>
        </div>
        <div className='item'>
          <StarO fontSize={16} />
          <div>{props.collect_count ? props.collect_count : '收藏'}</div>
        </div>
      </div>
      <div className='btnList'>
        <Button onClick={clickEvent} style={{marginRight: '2vw'}} size='small' icon={<VideoO />} disabled={props.state != '2'} type='primary'>查看视频</Button>
        <Button onClick={() => props.deleteEvent && props.deleteEvent(props.id, props.index)} size='small' icon={<DeleteO/>} disabled={props.state != '2'} type='danger'>删除视频</Button>
      </div>
    </div>
  )
}
