import React, { memo } from 'react'
import { Image, Typography } from 'react-vant'
import "./messageInfo.less"

interface IProps {
  type: string
  resource_info: any
}

export default memo(function MessageInfo(props: IProps) {
  return (
    <div id='MessageInfo'>
      {
        props.type == '2' ? (
          <div className='infoContainer'>
            <Image fit='cover' src={props.resource_info.cover_img} />
            <div className='infoTitle'>
              <Typography.Text ellipsis={2}>{props.resource_info.title}</Typography.Text>
              <span className='target'>文章</span>
            </div>
          </div>
        ) : ''
      }
    </div>
  )
}) 
