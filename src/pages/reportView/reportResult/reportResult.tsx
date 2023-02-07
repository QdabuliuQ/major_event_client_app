import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Empty, Tabs, NavBar } from 'react-vant';
import { getArticleReportList, getCommentReportList } from "@/network/reportView/reportResult";
import ScrollList from "@/components/scrollList/scrollList";
import ArticleItem from "../articleItem/articleItem";
import CommentItem from "../commentItem/commentItem";
import "./reportResult.less"

let offset = 1

export default function ReportResult() {
  const router = useNavigate()

  const [height, setHeight] = useState(0)
  const [more, setMore] = useState(true)
  const [type, setType] = useState(0)
  const [comments, setComments] = useState<{
    comment_id: string
    content: string
    id: string
    reason: string
    state: string
    time: number
  }[]>([])
  const [article, setArticle] = useState<{
    id: string
    cover_img: string
    title: string
    content: string
    state: string
    art_id: string
    reason: string
    time: number
    desc: string
  }[]>([])

  const getData = (type: number) => {
    if (type == 0) {
      getArticleReportList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) setArticle(res.data)
        else setArticle([...article, ...res.data])
        setMore(res.more)
      })
    } else {
      getCommentReportList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) setComments(res.data)
        else setComments([...comments, ...res.data])
        setMore(res.more)
      })
    }
  }

  const onChange = (e: string | number) => {
    setMore(true)
    offset = 1
    setType(e as number)
    getData(e as number)
  }

  useEffect(() => {
    getData(type)
    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight)
  }, [])

  return (
    <div id='ReportResult'>
      <NavBar
        fixed={true}
        placeholder={true}
        title="举报结果"
        onClickLeft={() => router(-1)}
      />
      
      <ScrollList
        height={height}
        cb={() => {
          offset ++
          getData(type)
        }}
        hasMore={more}
      >
        <Tabs onChange={onChange}>
          <Tabs.TabPane title='文章举报'>
          </Tabs.TabPane>
          <Tabs.TabPane title='评论举报'>
          </Tabs.TabPane>
        </Tabs>
        <div className='listContainer'>
          {
            type == 0 ? (
              article.length ? (
                article.map(item => (
                  <ArticleItem
                    key={item.id}
                    cover_img={item.cover_img}
                    title={item.title}
                    content={item.content}
                    state={item.state}
                    art_id={item.art_id}
                    reason={item.reason}
                    time={item.time}
                    desc={item.desc}
                  />
                ))
              ) : <Empty description="暂无举报记录" />
            ) : comments.length ? (
              comments.map(item => (
                <CommentItem
                  key={item.id}
                  comment_id={item.comment_id}
                  content={item.content}
                  id={item.id}
                  reason={item.reason}
                  state={item.state}
                  time={item.time}
                />
              ))
            ) : <Empty description="暂无举报记录" />
          }
        </div>
      </ScrollList>

    </div>
  )
}
