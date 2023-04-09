import React, { useEffect, useState } from 'react'
import PubSub from 'pubsub-js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Empty, Input, ActionSheet, Toast, Swiper, Button, ShareSheet } from 'react-vant';
import VideoNav from "./videoNav/videoNav";
import VideoContent from "./videoContent/videoContent";
import CommentItem from "@/components/commentItem/commentItem";
import ScrollList from "@/components/scrollList/scrollList";
import { getVideoList, pubVideoComment, getVideoComment } from "@/network/videoView/videoView";
import { getReportReason } from "@/network/reportView/reportView";
import { add_message_info } from '@/reduxs/actions/message';
import { add_event_info } from '@/reduxs/actions/event';
import "./videoView.less"

let offset = 1

export default function VideoView() {

  let more = true
  const options = [
    { name: '分享', icon: <div className='articleMenuItem'><img src={require("@/assets/images/event.png")} alt="" /></div> },
    { name: '转发', icon: <div className='articleMenuItem'><img src={require("@/assets/images/send.png")} alt="" /></div> },
    { name: '举报', icon: <div className='articleMenuItem'><img src={require("@/assets/images/report.png")} alt="" /></div> },
  ]
  const router = useNavigate()
  const dispatch = useDispatch()
  const [reason, setReason] = useState<{
    name: string
  }[]>([])
  const [sheetVisible, setSheetVisible] = useState(false)
  const [vid, setVid] = useState('')
  const [commentOffset, setCommentOffset] = useState(1)
  const [commentMore, setCommentMore] = useState(true)
  const [commentList, setCommentList] = useState<{
    comment_id: string
    content: string
    is_delete: string
    nickname: string
    time: number
    user_id: string
    user_pic: string
    video_id: string
    praise_count: number
    is_praise: number
  }[]>([])
  const [video_id, setVideo_id] = useState('')
  const [val, setVal] = useState('')
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)
  const [list, setList] = useState<{
    cover_img: string
    id: string
    nickname: string
    state: string
    time: number
    title: string
    user_id: string
    user_pic: string
    duration: number
    praise_count: number
    comment_count: number
    collect_count: number
    is_praise: number
    is_collect: number
    video_url: string
  }[]>([])


  const getData = () => {
    if (more) {
      getVideoList({
        offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        setList([...list, ...res.data])
        more = res.more
      })
    }
  }

  const onChange = (e: number) => {

    if (e != -1) {
      // 下拉加载 下一页数据
      if (e == list.length - 1) {
        offset++
        getData()
      }
      setIdx(e)
    }
  }

  // 发送评论
  const pubComment = () => {
    let content = val.trim()
    if (content.length > 100) {
      Toast.fail('内容不能超过100个字')
    }
    pubVideoComment({
      video_id,
      content,
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      setCommentOffset(1)
      getCommentData('', 1)
      Toast.success(res.msg)

      setVal('')
    })
  }
  // 获取评论数据
  const getCommentData = (vid?: string, offset?: number) => {
    let _offset = offset ? offset : commentOffset
    getVideoComment({
      video_id: vid ? vid : video_id,
      offset: _offset,
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('获取失败')
      }
      if (_offset == 1) {
        setCommentList(res.data)
      } else {
        setCommentList([...commentList, ...res.data])
      }
      setCommentMore(res.more)
      setCommentOffset(commentOffset + 1)
    })
  }

  useEffect(() => {
    getData()

    // 消息订阅
    PubSub.subscribe('commentDetail', (msg: string, id: string) => {
      setCommentOffset(1)
      setCommentMore(true)
      getCommentData(id, 1)
      setVideo_id(id)
      setVisible(true)
    })
    PubSub.subscribe('moreEvent', (msg: string, id: string) => {
      setVid(id)
      setSheetVisible(true)
    })

    getReportReason({
      type: '2'
    }).then((res: any) => {
      setReason(res.data)
    })
  }, [])

  return (
    <div id='VideoView'>
      <ShareSheet
        visible={sheetVisible}
        options={options}
        onCancel={() => setSheetVisible(false)}
        onSelect={(option, index) => {
          switch (index) {
            case 0:
              dispatch(add_event_info({
                type: '3',
                resource_info: list[idx]
              }))
              router(`/pubEvent`)
              break;
            case 1:
              dispatch(add_message_info({  // 存入 redux 当中
                type: '3',
                resource_info: list[idx]
              }))
              router(`/sendList`)
              break;
            case 2:
              router(`/report/${vid}/2`)
              break;
          }
          setVisible(false)
        }}
      />
      <ActionSheet closeable={false} title='视频评论' visible={visible} onCancel={() => setVisible(false)}>
        {
          commentList.length ? (
            <ScrollList
              cb={() => {
                getCommentData()
              }}
              hasMore={commentMore}
              height={'60vh'}
            >
              <div style={{ padding: '6vw 4vw' }}>
                {
                  commentList.map(item => (
                    <CommentItem
                      key={item.comment_id}
                      content={item.content}
                      time={item.time}
                      nickname={item.nickname}
                      user_pic={item.user_pic}
                      comment_id={item.comment_id}
                      user_id={item.user_id}
                      video_id={item.video_id}
                      showReply={false}
                      click={false}
                      praise={item.praise_count}
                      is_praise={item.is_praise}
                      reason={reason}
                    />
                  ))
                }
              </div>

            </ScrollList>
          ) : (
            <div style={{ height: '60vh' }}>
              <Empty description="暂无评论内容" />
            </div>
          )
        }
        <div style={{
          padding: '2vw 3vw',
          boxShadow: '0 -1px 17px 0 rgba(0,0,0,.1)'
        }}>
          <Input
            value={val}
            maxLength={100}
            onChange={setVal}
            suffix={<Button onClick={pubComment} round size="small" type="primary">发送</Button>}
            placeholder="请输入评论内容"
          />
        </div>
      </ActionSheet>
      <VideoNav />
      <Swiper onChange={onChange} indicator={false} loop={false} vertical style={{ height: '100%' }}>
        {
          list.map((item, index) => (
            <Swiper.Item key={item.id}>
              <VideoContent
                isPlay={index == idx}
                {...item} />
            </Swiper.Item>
          ))
        }
      </Swiper>
    </div>
  )
}
