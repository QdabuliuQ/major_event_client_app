import React, { memo, useRef, useState } from 'react'
import PubSub from 'pubsub-js';
import { useLocation, useParams } from 'react-router-dom'
import { Toast } from 'react-vant';
import { addMessageRecord } from "@/network/messageView/messageView";
import "./messageEdit.less"

export default memo(function MessageEdit() {
  const { to_id, room_id } = useParams()
  const info = JSON.parse(localStorage.getItem('info') as string)
  const [isInput, setIsInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputChange = (e: any) => {
    if(isInput && inputRef.current?.value.length == 0) {
      setIsInput(false)
    } else {
      setIsInput(true)
    }
  }

  const sendMessage = () => {
    let val = inputRef.current?.value.trim() as string
    if(val != '' && val.length <= 200) {
      addMessageRecord({
        type: '1',
        to_id: to_id as string,
        room_id: room_id as string,
        resource: val
      }).then((res: any) => {
        if(res.status) return Toast.fail(res.msg);
        PubSub.publish('sendMessage', {
          from_id: info.id,
          from_user_nickname: info.nickname,
          from_user_pic: info.user_pic,
          msg_id: res.msg_id,
          resource: val,
          resource_info: null,
          room_id: room_id,
          to_id: to_id,
          type: '1',
          time: res.time
        });
        (inputRef.current as HTMLInputElement).value = ''
      })
    }
  }

  return (
    <div id='MessageEdit'>
      <div className='inputContainer'>
        <input ref={inputRef} onKeyUp={(e) => e.keyCode === 13 && sendMessage()} onChange={inputChange} placeholder='输入发送的内容' type="text" />
      </div>
      <span 
        onClick={sendMessage}
        className='sendBtn'
        style={{color: isInput ? '#409eff' : '#ccc'}}>
        发送
      </span>
    </div>
  )
}) 
