import React, { useEffect, useRef, useState } from 'react'
import { Search } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom'
import { Dialog, Image } from 'react-vant';
import { useSelector, useDispatch } from "react-redux";
import { Empty, NavBar, Toast } from 'react-vant'
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { getUserFollow } from "@/network/userListView/userListView";
import UserItem from "@/components/userItem/userItem";
import MessageInfo from "./component/messageInfo/messageInfo";
import { useSocket } from "@/hooks/useSocket";
import "./sendListView.less"
import { addChatObject, addMessageRecord } from '@/network/messageView/messageView';

interface UserItemInt {
  nickname: string
  user_pic: string
  intro: string | null
  id: string
}

export default function SendListView() {
  let timer: any = null
  const router = useNavigate()
  let socket = useSocket()
  const inputRef = useRef<HTMLInputElement>(null)
  const my_info: any = JSON.parse(localStorage.getItem('info') as string)
  const id = localStorage.getItem('id')
  const info = useSelector((state: any) => state.message)
  
  let h = useGetHeight([
    '.rv-nav-bar',
    '.searchContainer'
  ])
  const [user, setUser] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(true)
  const [list, setList] = useState<UserItemInt[]>([])

  // 输入改变监听
  const inputChange = () => {
    // 防抖
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      let val = inputRef.current?.value.trim()
      getData(1, val as string)
    }, 400);
  }

  // 获取关注列表
  const getData = (offset: number, val: string) => {
    getUserFollow({
      offset,
      id: id as string,
      val 
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail(res.msg)
      }
      if(offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
      setMore(res.more)
    })
  }

  // 创建聊天房间
  const createChatObj = async () => {
    return new Promise((resolve) => {
      addChatObject({
        to_id: (user as any).id
      }).then((res: any) => {
        if(res.status) {
          Toast.fail(res.msg)
        } 
        resolve(res)
      })
    })
  }
  
  // 打开弹窗
  const clickEvent = (data: UserItemInt) => {
    if (!info) {
      Toast.fail('未知错误')
      router(-1)
    }
    setUser(data)
    setVisible(true)
  }

  const confirmEvent = () => {
    let r_id = info.resource_info.id
    // 创建房间
    createChatObj().then((res: any) => {
      return new Promise((resolve) => {
        addMessageRecord({  // 添加记录
          type: info.type,
          to_id: (user as any).id,
          room_id: res.room_id,
          resource: r_id
        }).then((_res: any) => {
          if (_res.status) {
            return Toast.fail('发送失败')
          }
          Toast.success('发送成功')
          
          if(info.type == '2') {
            info.resource_info.content = info.resource_info.content.replace(/<[^>]+>/ig, '')
          }

          // 发送socket
          socket.send(JSON.stringify({
            from_id: id,
            from_user_nickname: my_info.nickname,
            from_user_pic: my_info.user_pic,
            msg_id: _res.msg_id,
            resource: r_id,
            resource_info: info.resource_info,
            room_id: res.room_id,
            to_id: user.id,
            type: info.type,
            time: _res.time
          }))
          setTimeout(() => {
            router(-1)  // 退出当前页面
          }, 1000);
        })
      })
    })
  }

  useEffect(() => {
    getData(1, '')
  }, [])

  return (
    <div id='SendListView'>
      <Dialog
        visible={visible}
        title='私信给'
        confirmButtonText='发送'
        showCancelButton
        onConfirm={confirmEvent}
        onCancel={() => setVisible(false)}
      >
        <div className='messageDialogContainer'>
          {
            user && info ? (
              <React.Fragment>
                <div className='userInfo'>
                  <Image round fit='cover' src={user.user_pic} />
                  <div className='userName'>
                    {user.nickname}
                  </div>
                </div>
                <MessageInfo type={info.type} resource_info={info.resource_info} />
              </React.Fragment>
            ) : ''
          }
        </div>
      </Dialog>
      <NavBar
        title="私信给"
        onClickLeft={() => router(-1)}
      />
      <div className='searchContainer'>
        <div className='inputContainer'>
          <Search  />
          <input onChange={inputChange} ref={inputRef} type="text" placeholder='搜索' />
        </div>
      </div>
      <ScrollList
        hasMore={more}
        height={h}
        cb={() => {
          setOffset(offset + 1)
          getData(offset + 1, inputRef.current?.value as string)
        }}>
        <div className='listContainer'>
          {
            list.length ? (
              list.map((item, idx) => (
                <UserItem
                  key={item.id}
                  id={item.id}
                  nickname={item.nickname}
                  user_pic={item.user_pic}
                  intro={item.intro}
                  is_follow={null}
                  click={clickEvent}
                />
              ))
            ) : (
              <Empty description="暂无关注用户" />
            )
          }
        </div>
      </ScrollList>
    </div>
  )
}
