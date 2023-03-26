import { useState, useRef, useEffect, forwardRef } from 'react'
import { useParams } from "react-router-dom";
import { Toast, Badge } from 'react-vant';
import { Star, GoodJob, GoodJobO, StarO, ChatO } from '@react-vant/icons';
import { collectArticle, praiseArticle } from "@/network/articleView/articleView";
import { pubArticleComment } from "@/network/articleView/navBar";
import "./navBar.less"

interface IProps {
  params: {
    collect_count: number
    is_collect: boolean
    is_praise: boolean
    praise_count: number
  }
  cb?: Function
}

export const _NavBar = forwardRef((props: IProps, ref) => {
  const [params, setParams] = useState<any>(null)
  const { id } = useParams()

  const inputRef = useRef<HTMLInputElement>(null)

  const praiseEvent = (is_praise: number) => {
    praiseArticle({
      is_praise,
      id: id as string
    }).then((res: any) => {
      if(res.status) return Toast.fail('操作失败')
      setParams({
        ...params,
        is_praise: is_praise ? true : false,
        praise_count: params.praise_count + (is_praise ? 1 : -1)
      })
    })
  }

  // 收藏
  const collectEvent = (is_collect: number) => {
    collectArticle({
      is_collect,
      id: id as string
    }).then((res: any) => {
      if(res.status) return Toast.fail('操作失败')
      setParams({
        ...params,
        is_collect: is_collect ? true : false,
        collect_count: params.collect_count + (is_collect ? 1 : -1)
      })
    })
  }

  // 发表评论
  const onKeyUpEvent = () => {
    let val = inputRef.current?.value.trim() as string
    if(val != '' && val.length <= 100) {
      pubArticleComment({
        art_id: id as string,
        content: val
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail(res.msg)
        }
        props.cb && props.cb();
        (inputRef.current as HTMLInputElement).value = ''
      })
    }
    
  }

  useEffect(() => {
    setParams({
      ...props.params
    })
    
  }, [props.params])

  return (
    <div id='NavBar'>
      <div className='commnentInput'>
        <input ref={inputRef} onKeyUp={(e) => e.keyCode === 13 && onKeyUpEvent()} placeholder='友善评论' type="text" />
      </div>
      {
        params && (
          <div className='dataInfo'>
            <Badge>
              <ChatO />
            </Badge>
            <Badge content={params.collect_count ? params.collect_count : ''}>
              {
                params && params.is_collect ? <Star color='#409eff' onClick={() => collectEvent(0)} /> : <StarO onClick={() => collectEvent(1)}/>
              }
            </Badge>
            <Badge content={params.praise_count ? params.praise_count : ''}>
              {
                params && params.is_praise ? <GoodJob color='#409eff' onClick={() => praiseEvent(0)} /> : <GoodJobO onClick={() => praiseEvent(1)}/>
              }
            </Badge>
          </div>
        )
      }
    </div>
  )
})
