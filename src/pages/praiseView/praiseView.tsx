import { useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { NavBar, Tabs } from 'react-vant';
import { useGetHeight } from '@/hooks/useGetHeight';
import "./praiseView.less"

export default function PraiseView() {
  const router = useNavigate()
  const location = useLocation()

  let path = location.pathname
  let height = useGetHeight([
    '.rv-nav-bar',
    '.rv-tabs__wrap'
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
    // getData(1)
  }, [])

  return (
    <div id='PraiseView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title={path == '/praise' ? '点赞文章' : '浏览记录'}
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={onChange}>
        <Tabs.TabPane title='文章' />
        <Tabs.TabPane title='视频' />
      </Tabs>
      <div style={{height}}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}