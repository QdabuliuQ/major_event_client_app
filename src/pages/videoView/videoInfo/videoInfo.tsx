import React from 'react'
import { useNavigate } from "react-router-dom";
import { Typography } from 'react-vant';
import "./videoInfo.less"

interface IProps {
  nickname: string
  title: string
  time: number
  user_id: string
  visible: boolean
}

export default function VideoRightInfo(props: IProps) {
  const router = useNavigate()

  return (
    <div style={{opacity: props.visible ? 1 : 0}} id='VideoRightInfo'>
      <div onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        router('/info', {
          state: {
            id: props.user_id
          }
        })
      }} className='infoItem itemName'>
        @{props.nickname}
      </div>
      <div className='infoItem itemTitle'>
        <Typography.Text
          ellipsis={{
            rows: 2,
            collapseText: '收起',
            expandText: '展开',
          }}
        >
          {props.title}
        </Typography.Text>
      </div>
      <div className='infoItem itemTime'>
        {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm')}
      </div>
    </div>
  )
}
