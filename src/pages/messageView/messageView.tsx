import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@react-vant/icons';
import { NavBar } from 'react-vant';
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { getChatObject } from '@/network/messageView/messageView';
import ChatItem from "@/components/chatItem/chatItem";
import "./messageView.less"

interface ListInt {
  another_id: string
  msg_time: number
  nickname: string
  resource: string
  room_id: string
  status: string
  time: number
  type: string
  user_id: string
  user_pic: string
}

export default function MessageView() {
  const router = useNavigate()
  const [list, setList] = useState<ListInt[]>([])
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
  const getData = (offset: number) => {
    getChatObject({
      offset,
      pageSize: 10
    }).then(res => {
      if (offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
    })
  }
  const itemClick = (item: ListInt) => {
    router(`/chat/${item.user_id}/${item.room_id}`)
  }
  useEffect(() => {
    getData(1)
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
        <div className='messageList'>
          {
            list.map(item => (
              <ChatItem
                key={item.room_id}
                img={item.user_pic}
                name={item.nickname}
                message={
                  <div className='messageInfo'>
                    <div className='leftMessage'>
                      {item.type == '1' ? item.resource : 
                      item.type == '2' ? '发送了一篇文章' :
                      item.type == '3' ? '发送了一个视频' : ''}
                    </div>
                    <div className='rightTime'>
                      {(React as any).$moment(item.msg_time).format('MM-DD HH:mm')}
                    </div>
                  </div>
                }
                click={() => {
                  itemClick(item)
                }} />
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
