import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { NavBar } from 'react-vant'
import { getUserInfoById, updateFollowUser } from "@/network/infoView/infoView";
import MessageEdit from "@/components/messageEdit/messageEdit";
import MessageList from "@/components/messageList/messageList";
import "./chatView.less"

export default function ChatView() {
  const { to_id, room_id } = useParams()
    
  const router= useNavigate()
  const [info, setInfo] = useState<any>(null)

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
      <MessageList />
      <MessageEdit />
    </div>
  )
}
