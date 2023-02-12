import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { NavBar, Empty, Toast } from 'react-vant';
import ScrollList from "@/components/scrollList/scrollList";
import CommentItem from "@/components/commentItem/commentItem";
import { getCommentDetail, getCommentFloor } from "@/network/commentList/commentList";
import { pubArticleComment } from "@/network/articleView/navBar";
import { getReportReason } from "@/network/reportView/reportView";
import { useCallbackState } from "@/hooks/useCbState";
import "./commentList.less"

export default function CommentList() {
  const router = useNavigate()
  const { id } = useParams()

  const inputRef = useRef<HTMLInputElement>(null)
  let offset = 1, artId = '', commentId = ''
  const [reason, setReason] = useState<{
    name: string
  }[]>([])
  const [height, setHeight] = useState(0)
  const [count, setCount] = useState(0)
  const [comment, setComment] = useState<any>(null)
  // const [comment, setComment] = useCallbackState(null)
  // const [commentList, setCommentList] = useCallbackState([])
  const [commentList, setCommentList] = useState<{
    content: string
    time: number
    nickname: string
    user_pic: string
    comment_id: string
    user_id: string
    reply: number
    praise: number
    is_praise: number
  }[]>([])

  const onKeyUpEvent = () => {
    let val = (inputRef.current as HTMLInputElement).value.trim()
    if(val == '' || val.length > 100) return
    console.log(comment.art_id, comment.comment_id);
    
    pubArticleComment({
      art_id: comment.art_id,
      content: val,
      parent_id: comment.comment_id,
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail('发表失败')
      }
      (inputRef.current as HTMLInputElement).value = ''
      Toast.success('发表成功')
      offset = 1
      setCommentList([])
      getData(comment.art_id, comment.comment_id)
    })
  }

  const getData = (art_id: string, comment_id: string) => {
    getCommentFloor({
      art_id,
      comment_id,
      offset,
      limit: 15,
    }).then((res: any) => {
      setCount(res.count)
      if(offset == 1) setCommentList(res.data)
      else {
        setCommentList([...commentList, ...res.data])
      }
    })
  }

  useEffect(() => {
    getCommentDetail({
      comment_id: id as string
    }).then((res: any) => {
      if (res.status) {
        Toast.fail(res.msg)
        router(-1)
      }
      setComment(res.data)
      getData(res.data.art_id, res.data.comment_id)
    })

    getReportReason({
      type: '2'
    }).then((res: any) => {
      setReason(res.data)

    })

    setHeight(document.documentElement.clientHeight - 46 - document.getElementsByClassName('inputContainer')[0].clientHeight)
  }, [])

  return (
    <div id='CommentList'>
      <NavBar
        title={count + '条回复'}
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      {
        comment && (
          <ScrollList height={height}>
            <div className='listContainer'>
              <CommentItem
                content={comment.content}
                time={comment.time}
                nickname={comment.nickname}
                user_pic={comment.user_pic}
                comment_id={comment.comment_id}
                user_id={comment.user_id}
                art_id={comment.art_id}
                praise={comment.praise}
                is_praise={comment.is_praise}
                showReply={false}
                click={false}
                reason={reason}
              />
              <div className='replyContainer'>
                <div className='replyTitle'>全部回复</div>
                {
                  commentList.length ? (
                    commentList.map((item: any) => (
                      <CommentItem
                        reason={reason}
                        key={item.comment_id}
                        praise={item.praise}
                        is_praise={item.is_praise}
                        content={item.content}
                        art_id={item.art_id}
                        time={item.time}
                        nickname={item.nickname}
                        user_pic={item.user_pic}
                        comment_id={item.comment_id}
                        user_id={item.user_id}
                        showReply={false}
                        click={false}
                      />
                    ))
                  ) : (
                    <Empty description="暂无回复" />
                  )
                }
              </div>
            </div>
          </ScrollList>

        )
      }
      <div className='inputContainer'>
        <input ref={inputRef} onKeyUp={(e: any) => e.keyCode === 13 && onKeyUpEvent()} placeholder='友善评论' type="text" />
      </div>
    </div>
  )
}
