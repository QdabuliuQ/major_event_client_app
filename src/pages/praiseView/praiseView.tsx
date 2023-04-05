import { useEffect, useState } from 'react'
import { useNavigate, useLocation  } from "react-router-dom";
import { Empty, Toast, NavBar } from 'react-vant';
import { getPraiseList, getBrowseList } from "@/network/praiseView/praiseView";
import ArticleItem from "@/components/articleItem/articleItem";
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from '@/hooks/useGetHeight';
import "./praiseView.less"

export default function PraiseView() {
  const router = useNavigate()
  const location = useLocation()
  
  let path = location.pathname
  const [offset, setOffset] = useState(1)
  const [status, setStatus] = useState('0')
  const [list, setList] = useState<{
    id: string
    title: string
    time: number
    cover_img: string
    content: string
    browse_count: number
    b_time?: number
    p_time?: number
  }[]>([])
  const [more, setMore] = useState(true)
  let height = useGetHeight([
    '.rv-nav-bar'
  ])

  const getData = (offset: number) => {
    if(path == '/praise') {
      getPraiseList({
        offset
      }).then((res: any) => {
        setStatus(res.status)
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
      })
    } else {
      getBrowseList({
        offset
      }).then((res: any) => {
        setStatus(res.status)
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
      })
    }
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div id='PraiseView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title={path == '/praise' ? '点赞文章' : '浏览记录'}
        onClickLeft={() => router(-1)}
      />
      {
        list && list.length ? (
          <ScrollList cb={() => {
            setOffset(offset + 1)
            getData(offset + 1)
          }} hasMore={more} height={height}>
            <div className='listContainer'>
              {
                list.map(item => (
                  <ArticleItem
                    key={item.id}
                    id={item.id}
                    browse_count={item.browse_count}
                    clickEvent={() => router('/article/' + item.id)}
                    title={item.title}
                    time={item.b_time ? item.b_time : item.p_time as number}
                    cover={item.cover_img}
                    content={item.content}
                  ></ArticleItem>
                ))
              }
            </div>
          </ScrollList>
        ) : (
          <Empty description="暂无点赞文章" />
        )
      }

    </div>
  )
}
