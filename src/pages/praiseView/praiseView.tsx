import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { NavBar, Tabs } from 'react-vant';
import { useGetHeight } from '@/hooks/useGetHeight';
import "./praiseView.less"

export default function PraiseView() {
  const router = useNavigate()
  const location = useLocation()

  let path = location.pathname
  let type: string = path.includes('praise') ? 'praise' : 'browse'
  const [active, setActive] = useState(0)  
  
  let height = useGetHeight(type == 'praise' ? [
    '.rv-nav-bar',
    '.rv-tabs__wrap'
  ] : [
    '.rv-nav-bar'
  ])

  const onChange = (name: string | number, tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        router('article', {
          replace: true
        })
        break;
      case 1:
        router('video', {
          replace: true
        })
        break;
    }
  }

  useEffect(() => {
    if(type == 'praise') {
      if(path == '/praise' || path == '/praise/article') setActive(0)
      else setActive(1)
    } else {
      if(path == '/browse' || path == '/browse/article') setActive(0)
      else setActive(1)
    }
    
  }, [])

  return (
    <div id='PraiseView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title={path.includes('praise') ? '点赞记录' : '浏览记录'}
        onClickLeft={() => router(-2)}
      />
      {
        type == 'praise' ? <Tabs active={active} onChange={onChange}>
          <Tabs.TabPane title='文章' />
          <Tabs.TabPane title='视频' />
        </Tabs> : ''
      }
      <div style={{height}}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}