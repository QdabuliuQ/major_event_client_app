import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { Image, Typography } from 'react-vant';
import { MessageInt } from "@/interface/global";
import "./articleMessage.less"

export default memo(function ArticleMessage(props: MessageInt) {
  const router = useNavigate()
  const toDetail = () => {
    router('/article/'+props.resource_info.id)
  }

  return (
    <div className='ArticleMessage MessageItem'>
      {
        props.my_id == props.from_id ? (
          <div className='messageMe'>
            <div className='message_i'>
              <div className='messageBox myMessage'>
                <div onClick={toDetail} className='articleInfo'>
                  <Image className='cover' fit='cover' src={props.resource_info.cover_img} />
                  <div className='articleTitle'>
                    <Typography.Text ellipsis={2}>{props.resource_info.title}</Typography.Text>
                    <div className='desc'>
                      {props.resource_info.content}
                    </div>
                  </div>
                </div>
                <div className='target'>文章</div>
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
                <div onClick={toDetail} className='articleInfo'>
                  <Image className='cover' fit='cover' src={props.resource_info.cover_img} />
                  <div className='articleTitle'>
                    <Typography.Text ellipsis={2}>{props.resource_info.title}</Typography.Text>
                    <div className='desc'>
                      {props.resource_info.content}
                    </div>
                  </div>
                </div>
                <div className='target'>文章</div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
) 