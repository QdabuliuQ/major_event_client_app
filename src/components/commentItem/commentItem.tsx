import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { WarningO, GoodJob, GoodJobO, Arrow } from '@react-vant/icons';
import moment from "moment";
import { ActionSheet, Image, Toast } from 'react-vant';
import { praiseComment } from "@/network/articleView/articleView";
import { addCommentReport } from "@/network/reportView/reportView";
import "./commentItem.less"

interface IProps {
  content: string
  time: number
  nickname: string
  user_pic: string
  comment_id: string
  user_id: string
  art_id: string
  praise: number,
  is_praise: number,
  reply?: number
  showReply?: boolean
  click?: boolean
  praiseClick?: ()=>void
  reason?: {
    name: string
  }[] 
}

export default function CommentItem({
  content,
  time,
  nickname,
  user_pic,
  comment_id,
  user_id,
  art_id,
  reply,
  praise,
  is_praise,
  showReply=true,
  click=true,
  reason,
  praiseClick
}: IProps) {
  const router = useNavigate()
  const [visible, setVisible] = useState(false)
  const [praiseCount, setPraiseCount] = useState(0)
  const [praiseState, setPraiseState] = useState(0)

  const praiseEvent = () => {
    let pState = praiseState ? 0 : 1
    praiseComment({
      comment_id,
      art_id,
      is_praise: pState
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail(res.msg)
      }
      setPraiseCount(pState ? praiseCount + 1 : praiseCount - 1)
      setPraiseState(pState ? 1 : 0)
    })
  }

  const selectEvent = (e: any) => {
    addCommentReport({
      comment_id,
      reason: e.name
    }).then((res: any) => {
      if(res.status) return Toast.fail(res.msg)
      Toast.success(res.msg)
      setVisible(false)
    })
  }

  

  useEffect(() => {
    setPraiseCount(praise)
    setPraiseState(is_praise)
  }, [praise, is_praise])

  return (
    <div onClick={() => click && router('/comment/'+comment_id)} className='CommentItem'>
      <div className='itemAvatar'>
        <Image round fit='cover' src={user_pic} />
      </div>
      <div className='itemInfo'>
        <div className='topInfo'>
          <div className='leftInfo'>
            { nickname }
          </div>
          <div onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            praiseEvent()
          }} className='rightInfo'>
            {
              praiseState ? <GoodJob color='#409eff' fontSize='15px'/> :<GoodJobO fontSize='15px' />
            }
            <span style={{color: praiseState ? '#409eff' : '#000'}}>{praiseCount}</span>
          </div>
        </div>
        <div className='contentInfo'>
          { content }
        </div>
        <div className='detailInfo'>
          <div className='leftInfo'>
            {
              showReply && (
                <div className='replyInfo'>
                  {reply ? reply : ''} 回复<Arrow style={{marginLeft: '3px'}} />
                </div>
              )
            }
            { moment(time).format('YYYY-MM-DD HH:mm')}
          </div>
          <div className='rightInfo'>
            <WarningO onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              setVisible(true)
            }} fontSize='15px' />
          </div>
        </div>
      </div>
      <ActionSheet 
        closeOnClickOverlay={true} 
        onSelect={(e) => selectEvent(e)}
        actions={reason} 
        visible={visible}
        onCancel={() => setVisible(false)}>
      </ActionSheet>
    </div>
  )
}
