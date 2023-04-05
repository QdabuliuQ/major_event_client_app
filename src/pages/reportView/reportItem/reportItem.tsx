import React, { memo } from 'react'
import { MoreO } from '@react-vant/icons'
import { Button, Tag, Typography } from 'react-vant'
import "./reportItem.less"

interface IProps {
  state: string
  reason: string
  index: number
  desc: string
  time: number
  children?: any
  detailEvent?: (index: number) => void
}

export default memo(function ReportItem(props: IProps) {
  return (
    <div className='ReportItem'>
      <div className='infoItem'>
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
      <div>
        { props.children }
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          举报理由
        </div>
        <div className='itemRight'>
          {
            props.reason
          }
        </div>
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          举报描述
        </div>
        <div className='itemRight'>
          <Typography.Text ellipsis>{props.desc}</Typography.Text>
        </div>
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          提交时间
        </div>
        <div className='itemRight'>
          { (React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss') }
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={() => props.detailEvent && props.detailEvent(props.index)} icon={<MoreO  />} size='small' type='primary'>
          查看详情
        </Button>
      </div>
    </div>
  )
}) 