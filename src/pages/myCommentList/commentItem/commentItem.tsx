import React from 'react'
import { useNavigate } from "react-router-dom";
import { DeleteO, OrdersO, GoodJobO, ChatO } from '@react-vant/icons';
import { Button, Typography } from 'react-vant';
import "./commentItem.less"

interface IProps {
  art_id?: string
  video_id?: string
  comment_id: string
  content: string
  is_delete: string
  praise_count: number
  reply: number
  time: string
  index: number
  deleteEvent?: (comment_id: string, type: string, index: number)=>void
}

export default function CommentItem(props: IProps) {
  const router = useNavigate()
    
  const pathChange = () => {
    if (props.art_id) {
      router('/article/'+props.art_id)
    }
  }


  return (
    <div className='_CommentItem'>
      <div className='commentContent'>
        <Typography.Text
          ellipsis={{
            rows: 3,
            collapseText: '收起',
            expandText: '展开',
          }}
        >
          {props.content}
        </Typography.Text>
      </div>
      
      <div className='commentInfo'>
        <div className='infoItem'>
          <div className='leftVal'>
            发布时间
          </div>
          <div className='rightVal'>
            { (React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss') }
          </div>
        </div>
      </div>
      <div className='commentData'>
        <div className='dataItem'>
          <GoodJobO fontSize={18} />
          <span>{props.praise_count == 0 ? '点赞' : props.praise_count}</span>
        </div>
        {
          props.reply != undefined && props.reply != null && props.reply != -1 && (
            <div className='dataItem'>
              <ChatO fontSize={18} /> 
              <span>{props.reply == 0 ? '回复' : props.reply}</span>
            </div>
          )
        }
      </div>
      <div className='commentBtn'>
        <Button onClick={pathChange} icon={<OrdersO/>} style={{marginRight: '2vw'}} size='small' type='primary'>查看文章</Button>
        <Button onClick={() => props.deleteEvent && props.deleteEvent(props.comment_id, props.art_id ? '1' : '2', props.index)} icon={<DeleteO  />} size='small' type='danger'>删除评论</Button>
      </div>
    </div>
  )
}
