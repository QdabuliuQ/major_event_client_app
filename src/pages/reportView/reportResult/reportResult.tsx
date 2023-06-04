import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Empty, Tabs, NavBar } from 'react-vant';
import {
  getArticleReportList,
  getCommentReportList,
  getVideoReportList,
  getMessageReportList
} from "@/network/reportView/reportResult";
import ScrollList from "@/components/scrollList/scrollList";
import ReportItem from "../reportItem/reportItem";
import VideoInfo from "@/pages/myVideoList/videoInfo/videoInfo";
import ArticleItem from "../articleItem/articleItem";
import CommentItem from "../commentItem/commentItem";
import MessageItem from "../messageItem/messageItem";
import "./reportResult.less"
import { useGetHeight } from '@/hooks/useGetHeight';

export default function ReportResult() {
  const router = useNavigate()
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(true)
  const [type, setType] = useState(0)
  const [videos, setVideos] = useState<any>([])
  const [messages, setMessages] = useState<any>([])
  const [comments, setComments] = useState<{
    comment_id: string
    content: string
    id: string
    reason: string
    state: string
    time: number
    rep_id: string
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
  let height = useGetHeight([
    '.rv-nav-bar',
    '.rv-tabs'
  ])

  const getData = (type: number, offset: number) => {
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
    } else if (type == 1) {
      getVideoReportList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) setVideos(res.data)
        else setVideos([...videos, ...res.data])
        setMore(res.more)
      })
    } else if(type == 2){
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
    } else {
      getMessageReportList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        if (offset == 1) setMessages(res.data)
        else setMessages([...messages, ...res.data])
        setMore(res.more)
      })
    }
  }

  const onChange = (e: string | number) => {
    setMore(true)
    setOffset(1)
    setType(e as number)
    getData(e as number, 1)
  }

  useEffect(() => {
    getData(type, 1)
  }, [])

  return (
    <div id='ReportResult'>
      <NavBar
        fixed={true}
        placeholder={true}
        title="举报结果"
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={onChange}>
        <Tabs.TabPane title='文章举报' />
        <Tabs.TabPane title='视频举报' />
        <Tabs.TabPane title='评论举报' />
        <Tabs.TabPane title='消息举报' />
      </Tabs>
      <ScrollList
        height={height}
        cb={() => {
          setOffset(offset + 1)
          getData(type, offset + 1)
        }}
        hasMore={more}
      >
        <div className='listContainer'>
          {
            type == 0 ? (
              article.length ? (
                article.map((item, index) => (
                  <ReportItem
                    key={item.id}
                    state={item.state}
                    reason={item.reason}
                    index={index}
                    desc={item.desc}
                    time={item.time}
                    detailEvent={() => router('/reportDetail/' + item.id)}>
                    <ArticleItem
                      cover_img={item.cover_img}
                      title={item.title}
                      content={item.content}
                      art_id={item.art_id}
                    />
                  </ReportItem>
                ))
              ) : <Empty description="暂无举报记录" />
            ) : type == 1 ? (
              videos.length ? (
                videos.map((item: any, index: number) => (
                  <ReportItem
                    key={item.id}
                    state={item.state}
                    reason={item.reason}
                    index={index}
                    desc={item.desc}
                    time={item.time}
                    detailEvent={() => router('/reportDetail/' + item.id)}>
                    <VideoInfo
                      style={{ marginBottom: '06px' }}
                      cover_img={item.cover_img}
                      title={item.title}
                      time={item.pub_date}
                      video_id={item.video_id}
                    />
                  </ReportItem>
                ))
              ) : <Empty description="暂无举报记录" />
            ) : type == 2 ? (
              comments.length ? (
                comments.map(item => (
                  <CommentItem
                    key={item.rep_id}
                    comment_id={item.comment_id}
                    content={item.content}
                    id={item.comment_id}
                    reason={item.reason}
                    state={item.state}
                    time={item.time}
                  />
                ))
              ) : <Empty description="暂无举报记录" />
            ) : type == 3 ? (
              messages.length ? (
                messages.map((item: any) => (
                  <MessageItem
                    key={item.msg_id+item.user_id}
                    {...item}
                  />
                ))
              ) : <Empty description="暂无举报记录" />
            ) : ''
          }
        </div>
      </ScrollList>

    </div>
  )
}
