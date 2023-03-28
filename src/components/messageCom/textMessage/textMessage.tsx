import React, { memo } from 'react'
import { Image } from 'react-vant';
import { MessageInt } from "@/interface/global";
import "./textMessage.less"

export default memo(function TextMessage(props: MessageInt) {
  return (
    <div className='TextMessage MessageItem'>
      {
        props.my_id == props.from_id ? (
          <div className='messageMe'>
            <div className='messageContainer myMessage'>
              {props.resource}
            </div>
            <div className='userInfo'>
              <Image round className='userImg' fit='cover' src={props.my_user_pic} />
            </div>
          </div>
        ) : (
          <div className='messageOther'>
              <div className='userInfo'>
                <Image round className='userImg' fit='cover' src={props.from_user_pic} />
              </div>
              <div className='messageContainer otherMessage'>
                {props.resource}
              </div>
          </div>
        )
        
      }
    </div>
  )
}) 
