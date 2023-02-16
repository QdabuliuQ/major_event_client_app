import { useEffect, useRef, useState } from 'react'
import moment from "moment";
import { WarnO, Ellipsis } from '@react-vant/icons';
import { Toast, Sticky, ShareSheet, NavBar, Typography, Image, Empty } from 'react-vant';
import { useParams, useNavigate } from "react-router-dom";
import { getArticleDetail, getArticleParams, getArticleComment } from "@/network/articleView/articleView";
import { getReportReason } from "@/network/reportView/reportView";
import { _NavBar } from "./component/navBar/navBar";
import CommentItem from "@/components/commentItem/commentItem";
import ScrollList from "@/components/scrollList/scrollList";
import "./articleView.less"

export default function ArticleView() {
  const router = useNavigate()

  let offset = 1
  const navbarRef = useRef(null)
  const { id } = useParams()
  const [params, setParams] = useState<any>(null)
  const [visible, setVisible] = useState(false)
  const [reason, setReason] = useState<{
    name: string
  }[]>([])
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
  const [height, setHeight] = useState(400)
  const [more, setMore] = useState(true)

  const options = [
    { name: '举报', icon: <div className='articleMenuItem'><WarnO fontSize={'20px'} /></div> },
  ]

  const getCommentData = () => {
    getArticleComment({
      art_id: id as string,
      offset,
      limit: 15
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      setCommentList([...commentList, ...res.data])
      setMore(res.more)
      offset++
    })
  }

  useEffect(() => {
    getArticleDetail({ id: id as string }).then((res: any) => {
      if (res.status == 0) {
        setInfo(res.data)
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

    getCommentData()

    getReportReason({
      type: '2'
    }).then((res: any) => {
      setReason(res.data)
    })
    setTimeout(() => {
      setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight - (document.getElementById('NavBar') as HTMLDivElement).clientHeight)
    }, 100);


  }, [])

  return (
    <div id='ArticleView'>
      <ShareSheet
        visible={visible}
        options={options}
        onCancel={() => setVisible(false)}
        onSelect={(option, index) => {
          switch (index) {
            case 0:
              router(`/report/${id}/1`)
              break;
          }
          setVisible(false)
        }}
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
        status == 0 && info ? (
          <div>
            <ScrollList
              cb={getCommentData}
              hasMore={more}
              height={height}>
              <div className='articleInfoContainer'>
                <div className='articleTitle'>
                  <Typography.Text ellipsis={2}>{info.title}</Typography.Text>
                </div>
                <div className='articleTarget'>
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
                <div className='articleAuthor'>
                  <Image round fit='cover' width='1.25rem' height='1.25rem' src={info.user_pic} />
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
                <div className='articleContent' dangerouslySetInnerHTML={{ __html: info.content }}></div>
                <div className='articleComment'>
                  <div className='commentInfo'>
                    <span className='sp1'>评论 {params && params.comment_count}</span>
                    <span className='sp2'>{params && params.praise_count} 赞 
                    <label style={{ margin: '0 6px' }}></label>  {params && params.collect_count} 收藏</span>
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
                          reason={reason}
                        />
                      ))
                    ) : <Empty description="暂无评论" />
                  }
                </div>
              </div>
            </ScrollList>
            <Sticky position="bottom">
              <_NavBar ref={navbarRef} params={params}></_NavBar>
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
