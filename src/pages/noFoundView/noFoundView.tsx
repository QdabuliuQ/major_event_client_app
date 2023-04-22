import React from 'react'
import { Empty } from 'react-vant'
import "./noFoundView.less"

export default function NoFoundView() {
  return (
    <div id='NoFoundView'>
      <Empty 
        imageSize={180}
        image={<img src={require('@/assets/images/404.png')} />} 
        description="找不到该页面哦" />
    </div>
  )
}
