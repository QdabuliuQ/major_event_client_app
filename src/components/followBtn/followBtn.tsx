import React from 'react'
import { Plus } from '@react-vant/icons'
import "./followBtn.less"

interface IProps {
  is_follow: number
  id: string
  clickEvent?: (follow: number) => void
  followColor?: string
}

export default function FollowBtn(props: IProps) {

  const followUser = () => {
    props.clickEvent && props.clickEvent(props.is_follow ? 0 : 1)
  }

  console.log(localStorage.getItem('id') != props.id);

  return (
    <div className='FollowBtn'>
      {
        localStorage.getItem('id') != props.id && (
          props.is_follow ? <button onClick={followUser} style={{ backgroundColor: props.followColor ? props.followColor : '#ffffff4d' }} className='btnItem'>
            已关注
          </button>
          :
          <button onClick={followUser} className='unFollowBtn btnItem'>
            <Plus fontSize={14} /> <span style={{ marginLeft: '3px' }}>关注</span>
          </button>
        )
      }
    </div>
  )
}
