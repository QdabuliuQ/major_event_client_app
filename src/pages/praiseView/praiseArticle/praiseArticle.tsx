import React, { useEffect, useState } from 'react'
import { Empty, Toast } from 'react-vant'
import ArticleItem from "@/components/articleItem/articleItem";
import ScrollList from "@/components/scrollList/scrollList";
import SkeletonArticle from "@/components/skeletonArticle/skeletonArticle";
import { useGetHeight } from '@/hooks/useGetHeight';
import { useLocation, useNavigate } from 'react-router-dom';
import "./praiseArticle.less"
import { getBrowseList, getPraiseList } from '@/network/praiseView/praiseView';

export default function PraiseArticle() {
  const router = useNavigate()
  const location = useLocation()

  let path = location.pathname
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
  const [status, setStatus] = useState('0')
  const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(true)
  const [more, setMore] = useState(true)
  let height = useGetHeight([
    '.rv-nav-bar',
    '.rv-tabs__wrap'
  ])

  const getData = (offset: number) => {
    if (path == '/praise') {
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
        setLoading(false)
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
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div id='PraiseArticle'>
      <ScrollList cb={() => {
        setOffset(offset + 1)
        getData(offset + 1)
      }} hasMore={more} height={height}>
        <div className='listContainer'>
          {
            loading ? <SkeletonArticle cnt={5} /> : !loading && list && list.length ? (
              list.map(item => (
                <ArticleItem
                  key={item.id + (item.b_time ? item.b_time : '')}
                  id={item.id}
                  browse_count={item.browse_count}
                  clickEvent={() => router('/article/' + item.id)}
                  title={item.title}
                  time={item.b_time ? item.b_time : item.p_time as number}
                  cover={item.cover_img}
                  content={item.content}
                ></ArticleItem>
              ))
            ) : <Empty description="暂无点赞文章" />
          }
        </div>
      </ScrollList>
    </div>
  )
}
