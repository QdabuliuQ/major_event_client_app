import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Image, Typography } from 'react-vant'
import FollowBtn from "@/components/followBtn/followBtn";
import {  updateFollowUser } from "@/network/infoView/infoView";
import "./userItem.less"

interface IProps {
  is_follow: number | null
  nickname: string
  user_pic: string
  intro: string | null
  id: string
  click?: Function
  rightSlot?: any
}

export default memo(function UserItem(props: IProps) {
  const router = useNavigate()

  const [follow, setFollow] = useState(0)

  const clickEvent = (followSate: number) => {
    updateFollowUser({
      follow_id: props.id,
      is_follow: followSate
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      setFollow(followSate)
    })
  }

  const itemClick = () => {
    if(props.click) {
      props.click(props)
    } else {
      router('/info', {
        state: {
          id: props.id
        }
      })
    }
  }

  useEffect(() => {
    if (props.is_follow) {
      setFollow(props.is_follow)
    }
  }, [props.is_follow])

  return (
    <div onClick={itemClick} className='UserItem'>
      <div className='itemLeft'>
        <Image round fit='cover' src={props.user_pic} />
        <div className='userInfo'>
          <div>
            <div className='userName'>
            <Typography.Text ellipsis>{ props.nickname }</Typography.Text>
            </div>
            {
              props.intro && <Typography.Text  style={{marginTop: '3px', color: 'rgb(175 175 175)'}} size='sm' ellipsis>{ props.intro }</Typography.Text>
            }
          </div>
        </div>
      </div>
      {
        props.is_follow != null ? (
          <div className='itemBtn'>
            <FollowBtn 
              clickEvent={clickEvent}
              id={props.id} 
              followColor='rgb(206 206 206)' 
              is_follow={follow} />
          </div>
        ) : ''
      }
      {
        props.rightSlot ? props.rightSlot : ''
      }
    </div>
  )
})
