import React, { memo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Image, Popover, PopoverInstance, Toast } from 'react-vant';
import { useDispatch } from "react-redux";
import PubSub from 'pubsub-js';
import { MenuInt, MessageInt } from "@/interface/global";
import { useDocClick } from "@/hooks/useDocClick";
import { add_message_info } from '@/reduxs/actions/message';
import SendVideoInfo from "@/components/sendVideoInfo/sendVideoInfo";
import MenuItem from "@/components/menuItem/menuItem";
import { collectVideo } from '@/network/videoView/videoView';
import { tourchEndEvent, touchStateEvent } from "@/utils/tools";
import "./videoMessage.less"

export default memo(function VideoMessage(props: MessageInt) {
  const router = useNavigate()
  const dispatch = useDispatch()

  const popoverRef = useRef<PopoverInstance>(null)
  let flag: boolean = true

  const relayEvent = () => {  // 转发
    dispatch(add_message_info({  // 存入 redux 当中
      type: '3',
      resource_info: props.resource_info
    }))
    popoverRef.current?.hide()
    router('/sendList')  // 路由跳转
  }
  const collectEvent = () => {  // 收藏视频
    collectVideo({
      is_praise: 1,
      video_id: props.resource_info.id
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      popoverRef.current?.hide()
      Toast.success('收藏成功')
    })
  }
  const reportEvent = () => {  // 举报消息
    PubSub.publish('reportMessage', props)
    popoverRef.current?.hide()
  }
  const menuList: MenuInt[] = [
    {
      title: '转发',
      click: relayEvent
    },
    {
      title: '收藏',
      click: collectEvent
    },
    {
      title: '举报',
      click: reportEvent
    }
  ]
  const touchStart = () => {
    flag = false
    popoverRef.current?.show()
  }
  const touchEnd = (t: any) => {
    flag = true
  }

  const toDetail = () => {
    if (flag) {
      router('/video/' + props.resource_info.id)
    }
  }

  useDocClick((e: any) => {
    popoverRef.current?.hide()
  })

  return (
    <div className='VideoMessage MessageItem'>
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
                  <div onTouchStart={(e) => touchStateEvent(e, touchStart)} onTouchEnd={(e) => tourchEndEvent(e, touchEnd)} onClick={toDetail} className='messageBox myMessage'>
                    <SendVideoInfo
                      cover_img={props.resource_info.cover_img}
                      title={props.resource_info.title}
                    />
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
                <Image onClick={() => router('/info/'+props.my_id)} round className='userImg' fit='cover' src={props.my_user_pic} />
              </div>
            </div>
          </div>
        ) : (
          <div className='messageOther'>
            <div className='message_o'>
              <div className='userInfo'>
                <Image onClick={() => router('/info/'+props.from_id)} round className='userImg' fit='cover' src={props.from_user_pic} />
              </div>
              <Popover
                ref={popoverRef}
                placement='top'
                duration={100}
                trigger='manual'
                className='messagePopoverClass'
                reference={
                  <div onTouchStart={(e) => touchStateEvent(e, touchStart)} onTouchEnd={(e) => tourchEndEvent(e, touchEnd)} onClick={toDetail} className='messageBox otherMessage'>
                    <SendVideoInfo
                      cover_img={props.resource_info.cover_img}
                      title={props.resource_info.title}
                    />
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
