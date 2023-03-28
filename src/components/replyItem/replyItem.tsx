import React, { memo } from 'react'
import { Image, Typography } from 'react-vant'
import "./replyItem.less"

interface IProps {
  comment_id: string
  content: string
  nickname: string
  parent_id: string
  time: number
  user_id: string
  user_pic: string
  p_content: string
  p_comment_id: string
}

export default memo(function ReplyItem(props: IProps) {
  return (
    <div className='ReplyItem'>
      <div className='userInfo'>
        <div className='leftInfo'>
          <Image round fit='cover' src={props.user_pic} />
        </div>
        <div className='rightInfo'>
          <Typography.Text
            ellipsis={{
              rows: 4,
              collapseText: '收起',
              expandText: '展开',
            }}>
            回复你：{props.content}
          </Typography.Text>
          <div className='pubTime'>
            回复时间：{(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      </div>
      <div className='pCommentInfo'>
        <Typography.Text
          ellipsis={{
            rows: 4,
            collapseText: '收起',
            expandText: '展开',
          }}>
          <span className='actSpan'>我的评论</span>：{props.p_content}
        </Typography.Text>
      </div>
    </div>
  )
})
