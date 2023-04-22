import React from 'react'
import { Empty } from 'react-vant'
import "./errorView.less"

export default function ErrorView() {

  return (
    <div id='ErrorView'>
      <Empty 
        imageSize={180}
        image={<img src={require('@/assets/images/error.png')} />} 
        description="请使用移动设备访问" />
    </div>
  )
}
