import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabbar } from 'react-vant'
import { Comment, WapHome, PlayCircle, PlayCircleO, Friends, FriendsO, WapHomeO, CommentO } from '@react-vant/icons';
import "./navView.less"

export default function NavView() {
  const location = useLocation()
  const router = useNavigate()
  
  let menu: {name: string, index: string, icon: any, actIcon: any}[] = [
    { name: '首页', index: 'home', icon: <WapHomeO/>, actIcon: <WapHome /> },
    { name: '视频', index: 'video', icon: <PlayCircleO/>, actIcon: <PlayCircle /> },
    { name: '消息', index: 'message', icon: <CommentO/>, actIcon: <Comment /> },
    { name: '我的', index: 'profile', icon: <FriendsO/>, actIcon: <Friends /> },
  ]
  const [index, setindex] = useState<string>('home')

  useEffect(() => {
    let i = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
    if(i == 'index') setindex('home')
    else setindex(i)
  }, [])

  return (
    <div id='NavView'>
      <div className='routerContainer'>
        <Outlet/>
      </div>
      <Tabbar className={index == 'video' ? 'dark_tabbar' : ''} fixed={true} placeholder={true} value={index} onChange={v => setindex(v as string)}>
        { 
          menu.map(item => (
            <Tabbar.Item onClick={() => {
              console.log(item.index);
              
              router(item.index)
            }} key={item.index} name={item.index} icon={index == item.index ? item.actIcon : item.icon}>{item.name}</Tabbar.Item>
          ))
        }
      </Tabbar>
    </div>
  )
}
