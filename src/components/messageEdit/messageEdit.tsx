import React, { memo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Toast } from 'react-vant';
import { addMessageRecord } from "@/network/messageView/messageView";
import "./messageEdit.less"

export default memo(function MessageEdit() {
  const { to_id, room_id } = useParams()
  
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
    if(inputRef.current?.value != '' && (inputRef.current as HTMLInputElement).value.length <= 200) {
      addMessageRecord({
        type: '1',
        to_id: to_id as string,
        room_id: room_id as string,
        resource: (inputRef.current as HTMLInputElement).value
      }).then((res: any) => {
        if(res.status) return Toast.fail(res.msg);
        (inputRef.current as HTMLInputElement).value = ''
      })
    }
  }

  return (
    <div id='MessageEdit'>
      <div className='inputContainer'>
        <input ref={inputRef} onChange={inputChange} placeholder='输入发送的内容' type="text" />
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
