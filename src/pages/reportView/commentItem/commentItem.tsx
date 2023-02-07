import React from 'react'
import { Typography, Tag } from 'react-vant';
import "./commentItem.less"

interface IProps {
  comment_id: string
  content: string
  id: string
  reason: string
  state: string
  time: number
}

export default function CommentItem(props: IProps) {
  return (
    <div className='_CommentItem'>
      <div className='itemInfo'>
        <div className='itemLeft'>
          举报结果
        </div>
        <div className='itemRight'>
          {
            props.state == '1' ? <Tag size="medium" type="primary">审核中</Tag>
              : props.state == '2' ? <Tag size="medium" type="danger">封禁</Tag>
                : <Tag size="medium" type="success">正常</Tag>
          }
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          举报ID
        </div>
        <div className='itemRight'>
        {props.id}
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          评论内容
        </div>
        <div className='itemRight'>
          <Typography.Text
            ellipsis={{
              rows: 2,
              symbol: '......',
              suffixCount: 10,
            }}
          >
            {props.content}
          </Typography.Text>
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          举报理由
        </div>
        <div className='itemRight'>
          {props.reason}
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          提交时间
        </div>
        <div className='itemRight'>
          {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}
