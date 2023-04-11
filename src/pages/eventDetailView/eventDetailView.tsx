import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { Empty, NavBar, Tabs, Toast } from 'react-vant'
import EventItem from '@/components/eventItem/eventItem'
import { useGetHeight } from '@/hooks/useGetHeight'
import ScrollList from '@/components/scrollList/scrollList'
import { addEventComment, getEventComment, getEventPraiseList, praiseComment } from '@/network/eventDetailView/eventDetailView'
import "./eventDetailView.less"
import CommentItem from '@/components/commentItem/commentItem'
import UserItem from '@/components/userItem/userItem'


export default function EventDetailView() {
  let _event: any = null
  const inputRef = useRef<HTMLInputElement>(null)
  const { router } = useRouter()
  const [idx, setIdx] = useState(1)
  const [mores, setMores] = useState<boolean[]>([true, true, true])
  const [offsets, setOffsetS] = useState<number[]>([1,1,1])
  const [event, setEvent] = useState<any>(null)
  const [praiseList, setPraiseList] = useState<any>([])
  const [comment, setComment] = useState<any>([])
  let height = useGetHeight([
    '.rv-nav-bar',
    '.inputContainer'
  ])

  // 获取数据
  const getData = (offset: number, idx: number, ev_id: string) => {
    if(idx == 0) {   // 点赞用户数据
      getEventPraiseList({
        offset,
        ev_id,
      }).then((res: any) => {
        if(res.status) return Toast.fail(res.msg)
        if(offset == 1) {
          setPraiseList(res.data)
        } else {
          setPraiseList([...praiseList, ...res.data])
        }
        mores[idx] = res.more
        setMores([...mores])
      })
    } else if(idx == 1) {
      getEventComment({
        offset,
        ev_id,
      }).then((res: any) => {
        if(res.status) return Toast.fail(res.msg)
        if(offset == 1) {
          setComment(res.data)
        } else {
          setComment([...comment, ...res.data])
        }
        mores[idx] = res.more
        setMores([...mores])
      })
    } else {

    }
  }

  // 回车事件
  const onKeyUpEvent = () => {
    let val = (inputRef.current as HTMLInputElement).value.trim()
    if (val == '' || val.length > 100) return

    addEventComment({
      ev_id: event.ev_id,
      content: val
    }).then((res: any) => {
      if(res.status) return Toast.fail(res.msg)
      Toast.success('发表成功');
      (inputRef.current as HTMLInputElement).value = ''
    })
  }

  // 点赞回调
  const praiseClick = (data: any, cb: Function) => {
    praiseComment({
      ev_id: event.ev_id,
      comment_id: data.comment_id,
      is_praise: data.pState
    }).then((res: any) => {
      if(res.status) return Toast.fail(res.msg)
      cb()
    })
  }

  // 切换tab回调
  const tabChange = (_: any, i: number) => {
    if((i == 0 && praiseList.length == 0) 
    || (i == 1 && comment.length == 0)) {
      getData(offsets[i], i, event.ev_id)
    }
    setIdx(i)
  }

  useEffect(() => {
    _event = JSON.parse(sessionStorage.getItem('event') as string)
    console.log(_event);
    
    setEvent(_event)
    getData(1, 1, _event.ev_id)
  }, [])

  return (
    <div id='EventDetailView'>
      <NavBar
        title="动态详情"
        fixed
        placeholder
        onClickLeft={() => router(-1)}
      />
      {
        event ? (
          <ScrollList 
            cb={() => {
              getData(offsets[idx]+1, idx, event.ev_id)
              offsets[idx] = offsets[idx]+1
              setOffsetS([...offsets])
            }}
            hasMore={mores[idx]}
            height={height}>
            <div className='eventContainer'>
              <EventItem
                commentCount={event.commentCount}
                ev_id={event.ev_id}
                nickname={event.nickname}
                user_id={event.user_id}
                user_pic={event.user_pic}
                time={event.time}
                type={event.type}
                content={event.content}
                images={event.images}
                resource_id={event.resource_info}
                resource_info={event.resource_info}
                is_praise={event.is_praise}
                praise_count={event.praise_count}
              />
              <Tabs onChange={tabChange} defaultActive={idx} align='start'>
                <Tabs.TabPane title='点赞'>
                  {
                    praiseList.length ? (
                      praiseList.map((item: any) => (
                        <UserItem 
                          key={item.user_id}
                          is_follow={null} 
                          nickname={item.nickname} 
                          user_pic={item.user_pic} 
                          intro={null} 
                          id={item.user_id} 
                          rightSlot={
                            <span className='time'>{(React as any).$moment(item.time).fromNow()}</span>
                          }                         
                        />
                      ))
                    ) : <Empty description="暂无点赞记录" />
                  }
                </Tabs.TabPane>
                <Tabs.TabPane title='评论'>
                  {
                    comment.length ? (
                      comment.map((item: any) => (
                        <CommentItem
                          key={item.comment_id}
                          nickname={item.nickname}
                          user_pic={item.user_pic}
                          comment_id={item.comment_id}
                          user_id={item.user_id}
                          content={item.content}
                          time={item.time}
                          is_praise={item.is_praise}
                          showReply={false}
                          click={false}
                          praise={item.praiseCount}
                          praiseClick={praiseClick}
                        />
                      ))
                    ) : <Empty description="暂无评论" />
                  }
                </Tabs.TabPane>
                <Tabs.TabPane title='转发' />
              </Tabs>
            </div>
          </ScrollList>
        ) : ''
      }

      <div className='inputContainer'>
        <input ref={inputRef} onKeyUp={(e: any) => e.keyCode === 13 && onKeyUpEvent()} placeholder='友善评论' type="text" />
      </div>
    </div>
  )
}
