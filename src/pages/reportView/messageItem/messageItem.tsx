import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, Image } from 'react-vant'
import "./messageItem.less"

interface IProps {
  msg_id: string
  nickname: string
  reason: string
  resource: string
  send_id: string
  state: string
  time: number
  type: string
  user_id: string
  user_pic: string
}

export default memo(function MessageItem(props: IProps) {
  const router = useNavigate()
  const toDetail = () => {
    console.log(props.type);
    
    switch (props.type) {
      case '2':
        router('/article/' + props.resource)
        break;
      case '3':
        router('/video/' + props.resource)
        break;
    }
  }

  return (
    <div className='MessageItem'>
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
          {props.msg_id}
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          消息内容
        </div>
        <div onClick={toDetail} className='itemRight'>
          {
            props.type == '1' ? props.resource :
              <span className='linkSpan'>{props.resource}</span>
          }
        </div>
      </div>
      <div className='itemInfo'>
        <div className='itemLeft'>
          发送者
        </div>
        <div onClick={() => router('/info', {
          state: {
            id: props.send_id
          }
        })} className='itemRight'>
          <Image round fit='cover' src={props.user_pic} />
          <span className='linkSpan'>{props.nickname}</span>
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
          {props.time}
        </div>
      </div>
    </div>
  )
}) 