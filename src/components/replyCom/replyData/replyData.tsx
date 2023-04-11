import React, { memo, useEffect, useState } from 'react'
import { ChatO, GoodJob, GoodJobO, ShareO } from '@react-vant/icons'
import "./replyData.less"

interface IProps {
  praiseCount: number
  isPraise: number
  commentCount: number
  replyCount: number
  praiseCB?: Function
}

export default memo(function ReplyData(props: IProps) {

  const [_isPraise, setIsPraise] = useState(0)
  const [_praiseCount, setPraiseCount] = useState(0)

  const praiseClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let pState = _isPraise ? 0 : 1
    props.praiseCB && props.praiseCB({
      pState
    }, () => {
      setPraiseCount(pState ? _praiseCount + 1 : _praiseCount - 1)
      setIsPraise(pState ? 1 : 0)
    })
  }

  useEffect(() => {
    setIsPraise(props.isPraise)
    setPraiseCount(props.praiseCount)
  }, [props.isPraise, props.praiseCount])

  return (
    <div className='ReplyData'>
      <div onClick={(e) => praiseClick(e)} style={{color: _isPraise ? '#409eff' : '#909090'}} className='dataItem'>
        {
          _isPraise ? <GoodJob /> : <GoodJobO />
        }
        <span>{_praiseCount ? _praiseCount : '点赞'}</span>
      </div>
      <div className='dataItem'>
        <ChatO  />
        <span>{props.commentCount ? props.commentCount : '评论'}</span>
      </div>
      <div className='dataItem'>
        <ShareO  />
        <span>{props.replyCount ? props.replyCount : '转发'}</span>
      </div>
    </div>
  )
}) 
