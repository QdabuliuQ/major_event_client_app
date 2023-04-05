import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { ActionSheet, Toast } from 'react-vant';
import PubSub from 'pubsub-js';
import { useSocket } from "@/hooks/useSocket";
import { addMessageReport, getMessageList } from "@/network/messageView/messageView";
import TextMessage from "@/components/messageCom/textMessage/textMessage";
import ArticleMessage from "@/components/messageCom/articleMessage/articleMessage";
import VideoMessage from "@/components/messageCom/videoMessage/videoMessage";
import { useGetHeight } from '@/hooks/useGetHeight';
import "./messageList.less"
import { getReportReason } from '@/network/reportView/reportView';

export default memo(function MessageList() {
  let flag = true
  const messageListRef = useRef<HTMLDivElement>(null)
  const [socket, setSocket] = useState(useSocket())
  const { to_id, room_id } = useParams()
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(true)
  const [message, setMessage] = useState<any>([])
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState<any>(null)
  const [reason, setReason] = useState<{name: string}[]>([])
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

  // 消息举报
  const selectEvent = (e: any) => {
    if(info) {
      addMessageReport({  // 提交举报信息
        send_id: info.from_id,
        msg_id: info.msg_id,
        reason: e.name,
      }).then((res: any) => {
        if(res.status) return Toast.fail(res.msg)
        if(res.msg == '举报审核中') Toast.info(res.msg)
        else Toast.success(res.msg)
        setVisible(false)
      })
    }
  }

  useLayoutEffect(() => {
    let token = PubSub.subscribe('sendMessage', (_, data: any) => {
      setMessage([...message, data])
      socket.send(JSON.stringify(data))
      scrollBottom(0)
    })

    let r_token = PubSub.subscribe('reportMessage', (_: string, data: any) => {
      setInfo(data)
      setVisible(true)  // 打开举报弹窗
    })

    return () => {  // 取出订阅的时间
      PubSub.unsubscribe(token)
      PubSub.unsubscribe(r_token)
    }
  })

  useEffect(() => {
    getData(1)

    getReportReason({
      type: '2'
    }).then((res: any) => {
      setReason(res.data)
    })
    
  }, [])
  return (
    <div onScroll={scrollEvent} ref={messageListRef} style={{ height: h + 'px' }} className='messageContainer'>
      <ActionSheet 
        closeOnClickOverlay={true} 
        onSelect={(e) => selectEvent(e)}
        actions={reason} 
        visible={visible}
        onCancel={() => setVisible(false)}>
      </ActionSheet>
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
              ) : <VideoMessage 
                key={item.msg_id}
                my_user_pic={my_user_pic}
                my_id={my_id}
                {...item}
              />
            ))
          ) : <div></div>
        }
      </div>
    </div>
  );
}) 
