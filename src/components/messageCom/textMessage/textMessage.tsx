import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-vant';
import { MessageInt } from "@/interface/global";
import "./textMessage.less"

export default memo(function TextMessage(props: MessageInt) {
  const router = useNavigate()

  return (
    <div className='TextMessage MessageItem'>
      {
        props.my_id == props.from_id ? (
          <div className='messageMe'>
            <div className='message_i'>
              <div className='messageBox myMessage'>
                {props.resource}
              </div>
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
              <div className='messageBox otherMessage'>
                {props.resource}
              </div>
            </div>
          </div>
        )

      }
    </div>
  )
}) 
