import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getMessageList } from "@/network/messageView/messageView";
import TextMessage from "@/components/messageCom/textMessage/textMessage";
import "./messageList.less"

export default function MessageList() {

  const { to_id, room_id } = useParams()
  const [message, setMessage] = useState([])
  const my_user_pic = JSON.parse(localStorage.getItem('info') as string).user_pic
  const my_id = localStorage.getItem('id') as string
  console.log(my_user_pic);
  
  const getData = (offset: number) => {
    getMessageList({
      room_id: room_id as string,
      pageSize: 30,
      offset
    }).then(res => {
      console.log(res);
      setMessage(res.data)
    })
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div id='MessageList'>
      {
        message.length ? (
          message.map((item: any) => (
            item.type == '1' ? (
              <TextMessage 
                key={item.msg_id}
                my_user_pic={my_user_pic}
                from_id={item.from_id}
                my_id={my_id}
                from_user_nickname={item.from_user_nickname}
                from_user_pic={item.from_user_pic}
                msg_id={item.msg_id}
                resource={item.resource}
                resource_info={item.resource_info}
                room_id={item.room_id}
                time={item.time}
                to_id={item.to_id}
                type={item.type}
              />
            ) : ''
          ))
        ) : ''
      }
    </div>
  )
}
