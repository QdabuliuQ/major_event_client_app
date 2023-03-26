import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@react-vant/icons';
import { NavBar } from 'react-vant';
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import ChatItem from "@/components/chatItem/chatItem";
import "./messageView.less"

export default function MessageView() {
  const router = useNavigate()

  const noticeList = [
    {
      img: require('@/assets/images/comment.png'),
      name: '回复',
      click: () => router('/replyDetail')
    },
    {
      img: require('@/assets/images/praise.png'),
      name: '点赞',
      click: () => router('/praiseDetail')
    },
  ]
  const height = useGetHeight([
    '.rv-nav-bar',
    '.rv-tabbar'
  ])
  useEffect(() => {

  }, [])

  return (
    <div id='MessageView'>
      <NavBar
        title="消息列表"
        leftArrow={false}
      />
      <ScrollList height={height}>
        <div className='messageList'>
          {
            noticeList.map(item => (
              <ChatItem
                key={item.name}
                img={item.img}
                name={item.name}
                click={item.click}
                rightSlot={<Arrow />} />
            ))
          }
        </div>
        {/* <div className='messageList'>
          xxx
        </div> */}
      </ScrollList>
    </div>
  )
}
