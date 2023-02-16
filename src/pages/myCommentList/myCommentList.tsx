import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Empty, Tabs, Toast, NavBar } from 'react-vant';
import { getCommentById, deleteCommentById } from "@/network/myCommentList/myCommentList";
import CommentItem from "./commentItem//commentItem";
import ScrollList from "@/components/scrollList/scrollList";
import "./myCommentList.less"

export default function MyCommentList() {
  const router = useNavigate()

  const [more, setMore] = useState(true)
  const [height, setHeight] = useState(0)
  const [offset, setOffset] = useState(1)
  const [type, setType] = useState(1)
  const [commentList, setCommentList] = useState<any>([])

  const getData = (type: number = 1, _offset: number = 1) => {
    if (type == 1) {
      getCommentById({
        offset: _offset,
        type
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('网络错误')
        }
        if (_offset == 1) {
          setCommentList(res.data)
        } else {
          setCommentList([...commentList, ...res.data])
        }
        setMore(res.more)
      })
    } else if (type == 2) {
      getCommentById({
        offset: _offset,
        type
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('网络错误')
        }
        if (_offset == 1) {
          setCommentList(res.data)
        } else {
          setCommentList([...commentList, ...res.data])
        }
        setMore(res.more)
      })
    }
  }

  const deleteEvent = (id: string, type: string, index: number) => {
    deleteCommentById({
      comment_id: id,
      type,
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('删除失败')
      }
      commentList.splice(index, 1)
      setCommentList([...commentList])
      Toast.success('删除成功')
    })
  }

  useEffect(() => {
    getData()

    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight - document.getElementsByClassName('rv-tabs')[0].clientHeight)
  }, [])

  return (
    <div id='MyCommentList'>
      <NavBar
        title="评论"
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={(e: any) => {
        setOffset(1)
        setMore(true)
        setType(e + 1)
        getData(e + 1, 1)
      }}>
        <Tabs.TabPane title='文章' />
        <Tabs.TabPane title='视频' />
      </Tabs>
      {
        commentList.length ? (
          <ScrollList
            cb={() => {
              setOffset(offset + 1)
              getData(type, offset + 1)
            }}
            height={height}
            hasMore={more}
          >
            {
              <div className='listContainer'>
                {
                  commentList.map((item: any, index: number) => (
                    <CommentItem
                      key={item.comment_id}
                      art_id={item.art_id}
                      video_id={item.video_id}
                      comment_id={item.comment_id}
                      content={item.content}
                      is_delete={item.is_delete}
                      praise_count={item.praise_count}
                      reply={item.reply}
                      time={item.time}
                      index={index}
                      deleteEvent={deleteEvent}
                    />
                  ))
                }
              </div>
            }
          </ScrollList>
        ) : <Empty description="暂无发表评论" />
      }

    </div>
  )
}
