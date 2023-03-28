import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { NavBar } from 'react-vant'
import { getUserInfoById, updateFollowUser } from "@/network/infoView/infoView";
import MessageEdit from "@/components/messageEdit/messageEdit";
import MessageList from "@/components/messageList/messageList";
import { useGetHeight } from '@/hooks/useGetHeight';
import "./chatView.less"

export default function ChatView() {
  const { to_id, room_id } = useParams()
    
  const router= useNavigate()
  const [info, setInfo] = useState<any>(null)
  let h = useGetHeight([
    '#MessageEdit',
    '.rv-nav-bar'
  ])

  useEffect(() => {
    getUserInfoById({
      id: to_id as string
    }).then(res => {
      setInfo(res.data)
    })
  }, [])
  
  return (
    <div id='ChatView'>
      <NavBar
        title={info ? info.nickname : ''}
        onClickLeft={() => router(-1)}
      />
      <div style={{height: h+'px'}} className='messageContainer'>
        <MessageList />
      </div>
      <MessageEdit />
    </div>
  )
}
