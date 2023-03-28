import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoodJob } from '@react-vant/icons'
import { Typography, Image } from 'react-vant'
import "./praiseItem.less"

interface IProps {
  comment_id: string
  content: string
  id: string
  is_delete: string
  nickname: string
  time: number
  user_id: string
  user_pic: string
}

export default memo(function PraiseItem(props: IProps) {
  const router = useNavigate()

  return (
    <div className='PraiseItem'>
      <div className='userInfo'>
        <div onClick={() => router('/info', {
          state: {
            id: props.id
          }
        })} className='leftInfo'>
          <GoodJob  />
          <Image round fit='cover' src={props.user_pic} />
          <div className='nickName'>
            {props.nickname}
          </div>
        </div>
        <div className='rightInfo'>
          {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
      <div className='commentInfo'>
        <Typography.Text
          ellipsis={{
            rows: 4,
            collapseText: '收起',
            expandText: '展开',
          }}>
          <span className='actSpan'>我的评论</span>：{props.content}
        </Typography.Text>
      </div>
    </div>
  )
}) 