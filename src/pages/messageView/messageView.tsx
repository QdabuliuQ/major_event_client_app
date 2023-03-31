import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Arrow } from '@react-vant/icons';
import { Empty, NavBar } from 'react-vant';
import { useSelector, useDispatch } from "react-redux";
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { useSocket } from "@/hooks/useSocket";
import { getChatObject } from '@/network/messageView/messageView';
import ChatItem from "@/components/chatItem/chatItem";
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
    console.log(list, item);
    
    router(`/chat/${item.u_id}/${item.room_id}`)
  }

  socket.onmessage = (msg: any) => {
    console.log(list);
    
    let data = JSON.parse(msg.data)
    for(let i = 0; i < list.length; i ++) {
      if(list[i].u_id == data.from_id) {
        list[i].type = data.type
        list[i].resource = data.resource
        let obj = list.splice(i, 1)
        console.log(obj, list);
        
        list.unshift(obj[0])
        setList([...list])
        return
      }
    }
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
    console.log(socket);
    setTimeout(() => {
      console.log(list);
      
    }, 3000);
    socket.onmessage = (msg: any) => {
      
      let data = JSON.parse(msg.data)
      // for(let i = 0; i < list.length; i ++) {
      //   if(list[i].u_id == data.from_id) {
      //     list[i].type = data.type
      //     list[i].resource = data.resource
      //     let obj = list.splice(i, 1)
      //     console.log(obj, list);
          
      //     list.unshift(obj[0])
      //     setList([...list])
      //     return
      //   }
      // }
      // let chatObj: ListInt = {
      //   msg_time: data.time,
      //   nickname: data.from_user_nickname,
      //   resource: data.resource,
      //   room_id: data.room_id,
      //   type: data.type,
      //   u_id: data.from_id,
      //   time: data.time,
      //   status: '1',
      //   user_pic: data.from_user_pic,
      // }
      // setList([chatObj, ...list])
    }
    // console.log(useSocket());
    
    // if (_socket) {
    //   setSocket(_socket)
    // } else {
    //   setSocket(s)
    // }
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
            list.length ? (
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
