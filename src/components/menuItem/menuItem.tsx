import React, { memo } from 'react'
import { MenuInt } from '@/interface/global'
import "./menuItem.less"

export default memo(function MenuItem(props: MenuInt) {
  return (
    <div onClick={() => props.click()} className='MenuItem'>
      {props.title}
    </div>
  )
}
) 