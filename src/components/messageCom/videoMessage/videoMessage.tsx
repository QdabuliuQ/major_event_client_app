import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-vant';
import { MessageInt } from "@/interface/global";
import SendVideoInfo from "@/components/sendVideoInfo/sendVideoInfo";
import "./videoMessage.less"

export default memo(function VideoMessage(props: MessageInt) {
  const router = useNavigate()
  const toDetail = () => {
    router('/video/'+props.resource_info.id)
  }

  return (
    <div className='VideoMessage MessageItem'>
      {
        props.my_id == props.from_id ? (
          <div className='messageMe'>
            <div className='message_i'>
              <div onClick={toDetail} className='messageBox myMessage'>
                <SendVideoInfo
                  cover_img={props.resource_info.cover_img}
                  title={props.resource_info.title}
                />
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
              <div onClick={toDetail} className='messageBox otherMessage'>
                <SendVideoInfo
                  cover_img={props.resource_info.cover_img}
                  title={props.resource_info.title}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}) 
