import React, { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Image, Popover, PopoverInstance, Toast, Typography } from 'react-vant';
import { MenuInt, MessageInt } from "@/interface/global";
import PubSub from 'pubsub-js';
import MenuItem from '@/components/menuItem/menuItem';
import { useDispatch } from 'react-redux';
import { add_message_info } from '@/reduxs/actions/message';
import { collectArticle } from '@/network/articleView/articleView';
import { touchStateEvent, tourchEndEvent } from '@/utils/tools';
import "./articleMessage.less"

export default memo(function ArticleMessage(props: MessageInt) {
  const router = useNavigate()
  const dispatch = useDispatch()
  const popoverRef = useRef<PopoverInstance>(null)
  let flag: boolean = true
  const toDetail = () => {
    if (flag) {
      router('/article/' + props.resource_info.id)
    }
  }

  const relayEvent = () => {  // 转发
    dispatch(add_message_info({  // 存入 redux 当中
      type: '2',
      resource_info: props.resource_info
    }))
    popoverRef.current?.hide()
    router('/sendList')  // 路由跳转
  }
  const collectEvent = () => {  // 收藏视频
    collectArticle({
      is_collect: 1,
      id: props.resource_info.id
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      Toast.success(res.msg)
      popoverRef.current?.hide()
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

  return (
    <div className='ArticleMessage MessageItem'>
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
                  <div className='messageBox myMessage'>
                    <div onTouchStart={(e) => touchStateEvent(e, touchStart)} onTouchEnd={(e) => tourchEndEvent(e, touchEnd)} onClick={toDetail} className='articleInfo'>
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
}
) 