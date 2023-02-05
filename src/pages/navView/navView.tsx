import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabbar } from 'react-vant'
import { UserCircleO, WapHomeO } from '@react-vant/icons';
import "./navView.less"

export default function NavView() {
  const location = useLocation()
  const router = useNavigate()
  
  let menu: {name: string, index: string, icon: any}[] = [
    { name: '首页', index: 'home', icon: <WapHomeO/> },
    { name: '我的', index: 'profile', icon: <UserCircleO/> },
  ]
  const [index, setindex] = useState<string>('home')

  useEffect(() => {
    setindex(location.pathname.substring(location.pathname.lastIndexOf('/')+1))
  }, [])

  return (
    <div id='NavView'>
      <div className='routerContainer'>
        <Outlet/>
      </div>
      <Tabbar fixed={true} placeholder={true} value={index} onChange={v => setindex(v as string)}>
        {
          menu.map(item => (
            <Tabbar.Item onClick={() => {
              router(item.index)
            }} key={item.index} name={item.index} icon={item.icon}>{item.name}</Tabbar.Item>
          ))
        }
      </Tabbar>
    </div>
  )
}
