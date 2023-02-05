import React, { useEffect, useState  } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Empty, Toast, NavBar } from 'react-vant';
import UserItem from "@/components/userItem/userItem";
import ScrollList from "@/components/scrollList/scrollList";
import { getUserFollow, getUserFans } from "@/network/userListView/userListView";
import "./userListView.less"

export default function UserListView() {
  const router = useNavigate()
  const { id } = useParams()
  const loc = useLocation()
  
  let type = loc.pathname.indexOf('follow') != -1 ? 'follow' : 'fans'
  console.log(type);
  
  const [more, setMore] = useState(true)
  const [height, setHeight] = useState(0)
  const [status, setStatus] = useState(0)
  const [list, setList] = useState<{
    nickname: string
    user_pic: string
    intro: string | null
    is_follow: number
    id: string
  }[]>([])
  let offset = 1

  const getData = () => {
    if(type == 'follow') {
      getUserFollow({
        offset,
        id: id as string
      }).then((res: any) => {
        if(res.status) {
          setStatus(res.status)
          return Toast.fail(res.msg)
        }
        setMore(res.more)
        setList([...list, ...res.data])
      })
    } else {
      getUserFans({
        offset,
        id: id as string
      }).then((res: any) => {
        if(res.status) {
          setStatus(res.status)
          return Toast.fail(res.msg)
        }
        setMore(res.more)
        setList([...list, ...res.data])
      })
    }
  }

  useEffect(() => {
    getData()

    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight)
  }, [])

  return (
    <div id='UserListView'>
      <NavBar
        title={type == 'follow' ? "关注列表" : "粉丝列表"}
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      {
        status == 1 ? (<Empty image="error" description="网络错误" />)
        : status == 0 && list.length == 0 ? <Empty description="暂无关注用户" /> 
        : (
          <ScrollList 
            cb={() => {
              offset++
              getData()
            }}
            hasMore={more}
            height={height}>
            <div className='listContainer'>
              {
                list.map(item => (
                  <UserItem
                    key={item.id}
                    id={item.id}
                    nickname={item.nickname}
                    user_pic={item.user_pic}
                    intro={item.intro}
                    is_follow={item.is_follow}
                  />
                ))
              }
            </div>
          </ScrollList>
        )
      }
    </div>
  )
}
