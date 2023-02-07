import React from 'react'
import { Typography } from 'react-vant';
import "./videoRightInfo.less"

interface IProps {
  nickname: string
  title: string
  time: number
  visible: boolean
}

export default function VideoRightInfo(props: IProps) {
  return (
    <div style={{opacity: props.visible ? 1 : 0}} id='VideoRightInfo'>
      <div className='infoItem itemName'>
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
