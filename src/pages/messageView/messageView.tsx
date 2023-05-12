import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@react-vant/icons';
import { Empty, NavBar } from 'react-vant';
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { useSocket } from "@/hooks/useSocket";
import { getChatObject } from '@/network/messageView/messageView';
import ChatItem from "@/components/chatItem/chatItem";
import SkeletonChat from "@/components/skeletonChat/skeletonChat";
import "./messageView.less"

interface ListInt {
  u_id: string
  msg_time: number
  nickname: string
  resource: string
  room_id: string
  status: string
  time: number
  type: string
  user_pic: string
}

export default function MessageView() {
  const router = useNavigate()
  let id = localStorage.getItem('id')
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(true)
  const [list, setList] = useState<ListInt[]>([])
  const [socket, setSocket] = useState(useSocket())
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
    if(offset == 1) setLoading(true)
    getChatObject({
      offset,
      pageSize: 10
    }).then((res: any) => {
      if (offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
      setLoading(false)
      setMore(res.more)
    })
  }
  const itemClick = (item: ListInt) => {
    router(`/chat/${item.u_id}/${item.room_id}`)
  }

  // 消息监听
  socket.onmessage = (msg: any) => {
    // 数据转换
    let data = JSON.parse(msg.data)
    for(let i = 0; i < list.length; i ++) {
      if(list[i].u_id == data.from_id) {  // 判断是否存在在聊天列表当中
        list[i].type = data.type
        list[i].resource = data.resource
        let obj = list.splice(i, 1)
        list.unshift(obj[0])  // 插入到最前面
        setList([...list])
        return
      }
    }
    // 没有聊天对象 则创建一个
    let chatObj: ListInt = {
      msg_time: data.time,
      nickname: data.from_user_nickname,
      resource: data.resource,
      room_id: data.room_id,
      type: data.type,
      u_id: data.from_id,
      time: data.time,
      status: '1',
      user_pic: data.from_user_pic,
    }
    setList([chatObj, ...list])
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
      <ScrollList 
        height={height}
        hasMore={more}
        cb={() => {
          setOffset(offset + 1)
          getData(offset + 1)
        }}>
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
            loading ? <SkeletonChat cnt={5} /> : !loading && list.length ? (
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
            ) : <Empty description="找个人聊天吧~" />
          }
        </div>
      </ScrollList>
    </div>
  )
}
