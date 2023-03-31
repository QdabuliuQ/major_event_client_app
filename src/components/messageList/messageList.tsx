import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Toast } from 'react-vant';
import PubSub from 'pubsub-js';
import { useSocket } from "@/hooks/useSocket";
import { getMessageList } from "@/network/messageView/messageView";
import TextMessage from "@/components/messageCom/textMessage/textMessage";
import ArticleMessage from "@/components/messageCom/articleMessage/articleMessage";
import { useGetHeight } from '@/hooks/useGetHeight';
import "./messageList.less"

export default memo(function MessageList() {
  let flag = true
  const messageListRef = useRef<HTMLDivElement>(null)
  const [socket, setSocket] = useState(useSocket())
  const { to_id, room_id } = useParams()
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(true)
  const [message, setMessage] = useState<any>([])
  const my_user_pic = JSON.parse(localStorage.getItem('info') as string).user_pic
  const my_id = localStorage.getItem('id') as string
  let h = useGetHeight([
    '#MessageEdit',
    '.rv-nav-bar'
  ])

  // 消息监听
  socket.onmessage = (msg: any) => {
    let info = JSON.parse(msg.data)
    if(info.from_id == to_id) {
      setMessage([...message, info])
      scrollBottom(0)
    }
  }

  // 滚动到底部
  const scrollBottom = (wait: number = 100) => {
    setTimeout(() => {
      (messageListRef.current as HTMLDivElement).scrollTop = (messageListRef.current as HTMLDivElement).scrollHeight
    }, wait);
  }

  // 获取聊天数据
  const getData = (offset: number) => {
    getMessageList({
      room_id: room_id as string,
      pageSize: 20,
      offset
    }).then((res: any) => {
      if (res.status) return Toast.fail(res.msg)
      if (offset == 1) {
        setMessage(res.data)
        scrollBottom()
      } else {
        setMessage([...res.data, ...message])
      }
      setMore(res.more)
      setTimeout(() => {
        flag = true
      }, 0);
    })
  }

  // 滚动回调
  const scrollEvent = () => {
    let top = (messageListRef.current as HTMLDivElement).scrollTop
    if (top <= 50 && flag && more) {
      flag = false
      getData(offset + 1)
      setOffset(offset + 1)
    }
  }

  useLayoutEffect(() => {
    let token = PubSub.subscribe('sendMessage', (_, data: any) => {
      setMessage([...message, data])
      socket.send(JSON.stringify(data))
      scrollBottom(0)
    })

    return () => {  // 取出订阅的时间
      PubSub.unsubscribe(token)
    }
  })

  useEffect(() => {
    getData(1)
  }, [])
  // <TextMessage
  //   key={item.msg_id}
  //   my_user_pic={my_user_pic}
  //   from_id={item.from_id}
  //   my_id={my_id}
  //   from_user_nickname={item.from_user_nickname}
  //   from_user_pic={item.from_user_pic}
  //   msg_id={item.msg_id}
  //   resource={item.resource}
  //   resource_info={item.resource_info}
  //   room_id={item.room_id}
  //   time={item.time}
  //   to_id={item.to_id}
  //   type={item.type}
  // />
  return (
    <div onScroll={scrollEvent} ref={messageListRef} style={{ height: h + 'px' }} className='messageContainer'>
      <div id='MessageList'>
        {
          message.length ? (
            message.map((item: any) => (
              item.type == '1' ? (
                <TextMessage
                  key={item.msg_id}
                  my_user_pic={my_user_pic}
                  my_id={my_id}
                  {...item}
                />
              ) : item.type == '2' ? (
                <ArticleMessage
                  key={item.msg_id}
                  my_user_pic={my_user_pic}
                  my_id={my_id}
                  {...item}
                />
              ) : ''
            ))
          ) : <div></div>
        }
      </div>
    </div>
  );
}) 
