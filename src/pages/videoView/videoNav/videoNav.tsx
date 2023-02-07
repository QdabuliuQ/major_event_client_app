import React from 'react'
import { Search, AddO } from '@react-vant/icons';
import "./videoNav.less"

export default function VideoNav() {
  return (
    <div id='VideoNav'>
      <Search fontSize={25} color='#f0f0f0' />
      <AddO fontSize={25} color='#f0f0f0' />
    </div>
  )
}
