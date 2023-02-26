import React from 'react'
import { Arrow } from '@react-vant/icons';
import "./moreBtn.less"

interface IProps {
  title?: string
  clickEvent?: () => void
}

export default function MoreBtn(props: IProps) {
  return (
    <div onClick={() => props.clickEvent && props.clickEvent()} className='MoreBtn'>
      <div className='btn'>
        {props.title ?? '查看更多'}
        <Arrow fontSize={16}  />
      </div>
    </div>
  )
}
