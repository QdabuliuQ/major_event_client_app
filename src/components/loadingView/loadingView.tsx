import React from 'react'
import { Loading } from 'react-vant';
import "./loadingView.less"

export default function LoadingView() {
  return (
    <div id='LoadingView'>
      <div className='loadingContainer'>
        <Loading size="40" color="#409eff" />
        <div style={{marginTop: '8px'}}>加载页面中</div>
      </div>
    </div>
  )
}
