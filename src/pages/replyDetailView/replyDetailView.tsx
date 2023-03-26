import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Empty, NavBar } from 'react-vant'
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from "@/hooks/useGetHeight";
import { getReplyComment } from "@/network/messageView/messageView";
import ReplyItem from "@/components/replyItem/replyItem";
import "./replyDetailView.less"

interface PCommentint {
  comment_id: string
  user_id: string
  content: string
  is_delete: string
}

interface CommentInt {
  comment_id: string
  content: string
  is_delete: string
  nickname: string
  parent_comment: PCommentint
  parent_id: string
  time: number
  user_id: string
  user_pic: string
}

export default function ReplyDetailView() {
  const router = useNavigate()
  const [more, setMore] = useState(true)
  const [offset, setOffset] = useState(1)
  const [data, setData] = useState<CommentInt[]>([])
  let h = useGetHeight([
    '.rv-nav-bar'
  ])

  const getData = (offset: number) => {
    getReplyComment({
      offset,
      pageSize: 10
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
    <div id='ReplyDetailView'>
      <NavBar
        title="回复"
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
                  <ReplyItem 
                    key={item.comment_id}
                    comment_id={item.comment_id}
                    content={item.content}
                    nickname={item.nickname}
                    parent_id={item.parent_id}
                    time={item.time}
                    user_id={item.user_id}
                    user_pic={item.user_pic}
                    p_content={item.parent_comment.content}
                    p_comment_id={item.parent_comment.comment_id}
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
