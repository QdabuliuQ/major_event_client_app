import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Empty, NavBar } from 'react-vant'
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { getPraiseComment } from "@/network/messageView/messageView";
import PraiseItem from "@/components/praiseItem/praiseItem";
import "./praiseDetailView.less"

interface PraiseInt {
  comment_id: string
  content: string
  id: string
  is_delete: string
  nickname: string
  time: number
  user_id: string
  user_pic: string
}

export default function PraiseDetailView() {
  const router = useNavigate()
  const [more, setMore] = useState(true)
  const [offset, setOffset] = useState(1)
  const [data, setData] = useState<PraiseInt[]>([])

  let h = useGetHeight([
    '.rv-nav-bar'
  ])

  const getData = (offset: number) => {
    getPraiseComment({
      offset,
      pageSize: 15
    }).then((res: any) => {
      if(offset == 1) {
        setData(res.data)
      } else {
        setData([...data, ...res.data])
      }
      setMore(res.more)
    })
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div id='PraiseDetailView'>
      <NavBar
        title="点赞"
        onClickLeft={() => router(-1)}
      />
      {
        data.length ? (
          <ScrollList 
            hasMore={more}
            height={h}
            cb={() => {
              setOffset(offset + 1)
              getData(offset + 1)
            }}>
            <div className='scrollList'>
              {
                data.map(item => (
                  <PraiseItem 
                    key={item.id+item.comment_id}
                    comment_id={item.comment_id}
                    content={item.content}
                    id={item.id}
                    is_delete={item.is_delete}
                    nickname={item.nickname}
                    time={item.time}
                    user_id={item.user_id}
                    user_pic={item.user_pic}
                  />
                ))
              }
            </div>
          </ScrollList>
        ) : <Empty description="暂无内容" />
      }
    </div>
  )
}
