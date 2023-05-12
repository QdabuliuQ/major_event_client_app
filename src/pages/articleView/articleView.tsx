import { useEffect, useRef, useState } from 'react'
import moment from "moment";
import { Ellipsis, Exchange } from '@react-vant/icons';
import { useDispatch } from "react-redux";
import { Skeleton, Toast, Sticky, ShareSheet, NavBar, Typography, Image, Empty, Popover } from 'react-vant';
import { useParams, useNavigate } from "react-router-dom";
import { getArticleDetail, getArticleParams, getArticleComment } from "@/network/articleView/articleView";
import { _NavBar } from "./component/navBar/navBar";
import { add_message_info } from "@/reduxs/actions/message";
import CommentItem from "@/components/commentItem/commentItem";
import ScrollList from "@/components/scrollList/scrollList";
import { useGetHeight } from '@/hooks/useGetHeight';
import { add_event_info } from '@/reduxs/actions/event';
import "./articleView.less"

export default function ArticleView() {
  const router = useNavigate()
  const dispatch = useDispatch()
  const navbarRef = useRef(null)
  const actions = [{
    text: '点赞最多',
    type: 'praise'
  }, {
    text: '最早发布',
    type: 'last'
  }, {
    text: '最新发布',
    type: 'new'
  }]
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(1)
  const [params, setParams] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [toggleIdx, setToggleIdX] = useState(0)
  const [commentList, setCommentList] = useState<{
    content: string
    time: number
    nickname: string
    user_pic: string
    comment_id: string
    user_id: string
    reply: number
    art_id: string
    praise: number
    is_praise: number
  }[]>([])
  const [status, setStatus] = useState(0)
  const [info, setInfo] = useState<any>(null)
  const [more, setMore] = useState(true)
  const options = [
    { name: '分享', icon: <div className='articleMenuItem'><img src={require("@/assets/images/event.png")} alt="" /></div> },
    { name: '转发', icon: <div className='articleMenuItem'><img src={require("@/assets/images/send.png")} alt="" /></div> },
    { name: '举报', icon: <div className='articleMenuItem'><img src={require("@/assets/images/report.png")} alt="" /></div> },
  ]
  let height = useGetHeight([
    '.rv-nav-bar',
    '#NavBar'
  ])

  const selectEvent = (_: unknown, idx: number) => {
    setOffset(1)
    setToggleIdX(idx)
    if (commentList.length) getCommentData(1, actions[idx].type)
  }

  // 获取评论数据
  const getCommentData = (offset: number, type: string) => {
    getArticleComment({
      art_id: id as string,
      offset,
      limit: 30,
      order: type
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      if (offset == 1) {
        setCommentList(res.data)
      } else {
        setCommentList([...commentList, ...res.data])
      }
      setMore(res.more)
    })
  }

  const menuClick = (_: any, index: number) => {
    switch (index) {
      case 0:
        router(`/pubEvent`)
        break;
      case 1:
        router(`/sendList`)
        break;
      case 2:
        router(`/report/${id}/1`)
        break;
    }
    setVisible(false)
  }

  useEffect(() => {
    getArticleDetail({ id: id as string }).then((res: any) => {
      if (res.status == 0) {
        setInfo(res.data)
        dispatch(add_message_info({
          type: '2',
          resource_info: res.data
        }))
        dispatch(add_event_info({
          type: '2',
          resource_info: res.data
        }))
        setLoading(false)
      } else {
        setStatus(res.status)
      }
    })

    getArticleParams({ id: id as string }).then((res: any) => {
      if (res.status == 0) {
        setParams(res.data)
      } else {
        setStatus(res.status)
      }
    })

    getCommentData(1, actions[toggleIdx].type)

  }, [])

  return (
    <div id='ArticleView'>
      <ShareSheet
        visible={visible}
        options={options}
        onCancel={() => setVisible(false)}
        onSelect={menuClick}
      />
      <NavBar
        fixed={true}
        placeholder={true}
        title="文章详情"
        rightText={<Ellipsis color='#000000' fontSize={20} />}
        onClickLeft={() => router(-1)}
        onClickRight={() => setVisible(true)}
      />
      {
        status == 0 ? (
          <div>
            <ScrollList
              cb={() => {
                setOffset(offset + 1)
                getCommentData(offset + 1, actions[toggleIdx].type)
              }}
              hasMore={more}
              height={height}>
              <div className='articleInfoContainer'>
                <div className='articleTitle'>
                  {
                    loading && !info ? <Skeleton loading={loading} rowHeight={25} row={0} title /> : <Typography.Text ellipsis={2}>{info.title}</Typography.Text>
                  }
                </div>
                {
                  loading && !info ? <Skeleton loading={loading && !info} style={{ marginBottom: '13px' }} row={2} rowHeight={15} /> : <div className='articleTarget'>
                    <div className='cateTarget targetItem'>
                      {info.cate_name}
                    </div>
                    {
                      info.targets && info.targets.map((item: any) => (
                        <div key={item.value} className='tItem targetItem'>
                          {item.label}
                        </div>
                      ))
                    }
                  </div>
                }
                {
                  loading && !info ? <Skeleton loading={loading && !info} rowWidth={'70vw'} className='avatarSkeleton' row={1} avatarSize={'12vw'} avatar /> : <div className='articleAuthor'>
                    <Image round fit='cover' src={info.user_pic} />
                    <div onClick={() => {
                      router('/info', {
                        state: {
                          id: info.author_id
                        }
                      })
                    }} className='authorInfo'>
                      <div className='leftInfo'>
                        <div className='authorNickname'>
                          <Typography.Text ellipsis>
                            {info.nickname} {
                              info.intro && <span>({info.intro})</span>
                            }
                          </Typography.Text>
                        </div>
                        <div className='authorOther'>
                          发布时间：{moment(info.pub_date).format('YYYY-MM-DD HH:mm')}
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {
                  loading && !info ? <Skeleton style={{ margin: '10px 0' }} loading={loading && !info} row={8} rowHeight={17} /> : <div className='articleContent' dangerouslySetInnerHTML={{ __html: info.content }}></div>
                }
                <div className='articleComment'>
                  <div className='commentInfo'>
                    <Popover
                      placement="left"
                      actions={actions}
                      onSelect={selectEvent}
                      reference={<div className='infoToggle'>
                        <Exchange />
                        {actions[toggleIdx].text}
                      </div>}
                    />
                  </div>

                  {
                    commentList.length ? (
                      commentList.map(item => (
                        <CommentItem
                          art_id={item.art_id}
                          praise={item.praise}
                          is_praise={item.is_praise}
                          key={item.comment_id}
                          content={item.content}
                          time={item.time}
                          nickname={item.nickname}
                          user_pic={item.user_pic}
                          comment_id={item.comment_id}
                          user_id={item.user_id}
                          reply={item.reply}
                          type='1'
                        />
                      ))
                    ) : <Empty description="暂无评论" />
                  }
                </div>
              </div>
            </ScrollList>
            <Sticky position="bottom">
              <_NavBar cb={() => {
                setOffset(1)
                getCommentData(1, actions[toggleIdx].type)
              }} ref={navbarRef} params={params}></_NavBar>
            </Sticky>
          </div>
        ) : (
          status == 1 ? <Empty image="network" description="网络错误" />
            : <Empty image="error" description="文章内容被封禁" />
        )
      }
    </div>
  )
}
