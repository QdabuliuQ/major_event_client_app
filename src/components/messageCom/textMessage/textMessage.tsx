import React, { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js';
import { Image, Popover, PopoverInstance, Toast } from 'react-vant';
import { MenuInt, MessageInt } from "@/interface/global";
import { tourchEndEvent, touchStateEvent } from "@/utils/tools";
import MenuItem from '@/components/menuItem/menuItem';
import "./textMessage.less"

export default memo(function TextMessage(props: MessageInt) {
  const router = useNavigate()
  const popoverRef = useRef<PopoverInstance>(null)

  const reportEvent = () => {  // 举报消息
    popoverRef.current?.hide()
    PubSub.publish('reportMessage', props)
  }
  const copyEvent = () => {
    const textarea = document.createElement("textarea");
    textarea.value = props.resource;
    document.body.appendChild(textarea);
    textarea.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(textarea);
    Toast.success('复制成功')
    popoverRef.current?.hide()
  }
  const menuList: MenuInt[] = [
    {
      title: '复制',
      click: copyEvent
    },
    {
      title: '举报',
      click: reportEvent
    }
  ]
  const touchStart = () => {
    popoverRef.current?.show()
  }

  return (
    <div className='TextMessage MessageItem'>
      {
        props.my_id == props.from_id ? (
          <div className='messageMe'>
            <div className='message_i'>
              <Popover
                ref={popoverRef}
                placement='top'
                duration={100}
                trigger='manual'
                className='messagePopoverClass'
                reference={
                  <div onTouchStart={(e) => touchStateEvent(e, touchStart)} onTouchEnd={tourchEndEvent} className='messageBox myMessage'>
                    {props.resource}
                  </div>
                }
              >
                {
                  menuList.map(item => (
                    <MenuItem
                      key={item.title}
                      {...item}
                    />
                  ))
                }
              </Popover>
              <div className='userInfo'>
                <Image onClick={() => router('/info', {
                  state: {
                    id: props.my_id
                  }
                })} round className='userImg' fit='cover' src={props.my_user_pic} />
              </div>
            </div>
          </div>
        ) : (
          <div className='messageOther'>
            <div className='message_o'>
              <div className='userInfo'>
                <Image onClick={() => router('/info', {
                  state: {
                    id: props.from_id
                  }
                })} round className='userImg' fit='cover' src={props.from_user_pic} />
              </div>
              <Popover
                ref={popoverRef}
                placement='top'
                duration={100}
                trigger='manual'
                className='messagePopoverClass'
                reference={
                  <div onTouchStart={(e) => touchStateEvent(e, touchStart)} onTouchEnd={tourchEndEvent} className='messageBox otherMessage'>
                    {props.resource}
                  </div>
                }
              >
                {
                  menuList.map(item => (
                    <MenuItem
                      key={item.title}
                      {...item}
                    />
                  ))
                }
              </Popover>
            </div>
          </div>
        )
      }
    </div>
  )
}) 
